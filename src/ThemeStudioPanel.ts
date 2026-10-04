import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import type {
  WebviewToExtensionMessage,
  ExtensionToWebviewMessage,
  ThemeConfig,
  ThemeConfigV2
} from './messages';
import { ThemeStudioViewProvider } from './ThemeStudioViewProvider';
import { fetchGoogleFontsCatalog } from './google-fonts-service';
import { ProjectCommandHandler } from './project-command-handler.js';

export class ThemeStudioPanel {
  public static currentPanel: ThemeStudioPanel | undefined;
  public static readonly viewType = 'xDesignSystem';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _globalState: vscode.Memento;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri, globalState: vscode.Memento): ThemeStudioPanel {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (ThemeStudioPanel.currentPanel) {
      ThemeStudioPanel.currentPanel._panel.reveal(column);
      return ThemeStudioPanel.currentPanel;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      ThemeStudioPanel.viewType,
      'X Design System',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'dist', 'webview'),
          vscode.Uri.joinPath(extensionUri, 'public')
        ],
        retainContextWhenHidden: true
      }
    );

    ThemeStudioPanel.currentPanel = new ThemeStudioPanel(panel, extensionUri, globalState);
    return ThemeStudioPanel.currentPanel;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, globalState: vscode.Memento): void {
    ThemeStudioPanel.currentPanel = new ThemeStudioPanel(panel, extensionUri, globalState);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, globalState: vscode.Memento) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._globalState = globalState;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Update the content based on view state changes
    this._panel.onDidChangeViewState(
      () => {
        if (this._panel.visible) {
          this._update();
        }
      },
      null,
      this._disposables
    );

    // Handle messages from the webview
    this._setWebviewMessageListener();

    // Listen to VS Code settings changes
    this._registerSettingsListener();
  }

  public postMessage(message: ExtensionToWebviewMessage): void {
    this._panel.webview.postMessage(message);
  }

  public dispose(): void {
    ThemeStudioPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update(): void {
    this._panel.title = 'X Design System';
    this._panel.webview.html = this._getWebviewContent(this._panel.webview);
  }

  private _getWebviewContent(webview: vscode.Webview): string {
    const webviewDir = vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview');
    const indexPath = path.join(webviewDir.fsPath, 'index.html');

    let html = '';
    try {
      html = fs.readFileSync(indexPath, 'utf8');
    } catch {
      html = `<!DOCTYPE html><html><body><h2>Error loading webview content</h2><p>Could not find ${indexPath}</p></body></html>`;
      return html;
    }

    const nonce = getNonce();
    const baseUri = webview.asWebviewUri(webviewDir);
    const cspSource = webview.cspSource;

    // Build Content Security Policy header
    const cspMeta = `<meta http-equiv="Content-Security-Policy" content="
      default-src 'none';
      style-src ${cspSource} 'unsafe-inline' https://fonts.googleapis.com;
      font-src ${cspSource} https://fonts.gstatic.com;
      script-src 'nonce-${nonce}' ${cspSource};
      img-src ${cspSource} data: https:;
      connect-src https://www.googleapis.com https://fonts.googleapis.com;
    ">`;

    // Replace <head> to inject CSP meta tag and adjust base path
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n    ${cspMeta}\n    <base href="${baseUri}/">`);
    }

    // Add nonce to script tags
    html = html.replace(/<script /g, `<script nonce="${nonce}" `);

    return html;
  }

  private _setWebviewMessageListener(): void {
    const projectHandler = new ProjectCommandHandler(this._extensionUri, this._globalState);

    this._panel.webview.onDidReceiveMessage(
      async (message: WebviewToExtensionMessage) => {
        // First try routing to project management handler
        const handled = await projectHandler.handleMessage(message, (msg) => this.postMessage(msg));
        if (handled) return;

        switch (message.type) {
          case 'exportFile':
            await this._handleExportFile(message.fileName, message.content, message.format);
            break;
          case 'copyToClipboard':
            await vscode.env.clipboard.writeText(message.text);
            vscode.window.showInformationMessage('Copied to clipboard!');
            break;
          case 'saveThemeStateV2':
            if ('theme' in message && message.theme) {
              await this._globalState.update('activeThemeV2', message.theme);
              ThemeStudioViewProvider.postMessageToSidebar({
                type: 'restoreStateV2',
                theme: message.theme
              });
            }
            break;
          case 'saveThemeState':
            if ('theme' in message && message.theme) {
              await this._globalState.update('activeTheme', message.theme);
              ThemeStudioViewProvider.postMessageToSidebar({
                type: 'restoreState',
                theme: message.theme
              });
            }
            break;
          case 'fetchGoogleFonts':
            await this._handleFetchGoogleFonts(message.apiKey);
            break;
          case 'showInfoMessage':
            vscode.window.showInformationMessage(message.message);
            break;
          case 'openExternal':
            await vscode.env.openExternal(vscode.Uri.parse(message.url));
            break;
          case 'getPersistedState':
            this._handleGetPersistedState();
            break;
          case 'saveFavorites':
            await this._globalState.update('favorites', message.themeIds);
            break;
        }
      },
      null,
      this._disposables
    );
  }

  private async _handleExportFile(fileName: string, content: string, format: string): Promise<void> {
    let defaultExt = 'html';
    if (format === 'md') defaultExt = 'md';
    else if (format === 'json') defaultExt = 'json';
    else if (format === 'css') defaultExt = 'css';

    const filters: Record<string, string[]> = {};
    if (defaultExt === 'html') filters['HTML Page'] = ['html'];
    else if (defaultExt === 'md') filters['Markdown File'] = ['md'];
    else if (defaultExt === 'json') filters['JSON File'] = ['json'];
    else if (defaultExt === 'css') filters['CSS File'] = ['css'];
    filters['All Files'] = ['*'];

    const targetUri = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file(fileName),
      filters
    });

    if (targetUri) {
      try {
        await vscode.workspace.fs.writeFile(targetUri, Buffer.from(content, 'utf8'));
        const savedFileName = path.basename(targetUri.fsPath);
        vscode.window.showInformationMessage(`Theme exported to ${savedFileName}`);
        this.postMessage({
          type: 'fileSaved',
          fileName: savedFileName,
          success: true
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        vscode.window.showErrorMessage(`Failed to export file: ${errorMsg}`);
        this.postMessage({
          type: 'fileSaved',
          fileName,
          success: false
        });
      }
    }
  }

  private async _handleFetchGoogleFonts(apiKeyParam?: string): Promise<void> {
    const config = vscode.workspace.getConfiguration('xDesignSystem');
    const apiKey = apiKeyParam || config.get<string>('googleFontsApiKey') || '';

    const { items, fromApi } = await fetchGoogleFontsCatalog(apiKey, this._globalState);
    this.postMessage({
      type: 'googleFontsResult',
      items,
      fromApi
    });
  }

  private _handleGetPersistedState(): void {
    const themeV2 = this._globalState.get<ThemeConfigV2>('activeThemeV2');
    const themeV1 = this._globalState.get<ThemeConfig>('activeTheme');
    const favorites = this._globalState.get<string[]>('favorites');

    if (themeV2) {
      this.postMessage({
        type: 'restoreStateV2',
        theme: themeV2,
        favorites
      });
    } else {
      this.postMessage({
        type: 'restoreState',
        theme: themeV1,
        favorites
      });
    }
  }

  private _registerSettingsListener(): void {
    vscode.workspace.onDidChangeConfiguration(
      e => {
        if (e.affectsConfiguration('xDesignSystem.googleFontsApiKey')) {
          const val = vscode.workspace.getConfiguration('xDesignSystem').get<string>('googleFontsApiKey');
          this.postMessage({
            type: 'settingsChanged',
            key: 'googleFontsApiKey',
            value: val
          });
        }
        if (e.affectsConfiguration('xDesignSystem.defaultExportFormat')) {
          const val = vscode.workspace.getConfiguration('xDesignSystem').get<string>('defaultExportFormat');
          this.postMessage({
            type: 'settingsChanged',
            key: 'defaultExportFormat',
            value: val
          });
        }
      },
      null,
      this._disposables
    );
  }
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
