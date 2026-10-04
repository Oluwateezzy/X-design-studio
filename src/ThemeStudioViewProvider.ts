import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ThemeStudioPanel } from './ThemeStudioPanel';
import { ProjectCommandHandler } from './project-command-handler.js';
import type { ThemeConfig, ThemeConfigV2, WebviewToExtensionMessage, ExtensionToWebviewMessage } from './messages';

export class ThemeStudioViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'xDesignSystemSidebarView';
  public static currentView: ThemeStudioViewProvider | undefined;
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _globalState: vscode.Memento
  ) {
    ThemeStudioViewProvider.currentView = this;
  }

  public static postMessageToSidebar(message: ExtensionToWebviewMessage): void {
    if (ThemeStudioViewProvider.currentView?._view) {
      ThemeStudioViewProvider.currentView._view.webview.postMessage(message);
    }
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview'),
        vscode.Uri.joinPath(this._extensionUri, 'public')
      ]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    const projectHandler = new ProjectCommandHandler(this._extensionUri, this._globalState);

    webviewView.webview.onDidReceiveMessage(async (message: WebviewToExtensionMessage) => {
      const handled = await projectHandler.handleMessage(message, (msg) => webviewView.webview.postMessage(msg));
      if (handled) return;

      switch (message.type) {
        case 'openFullStudio':
          ThemeStudioPanel.createOrShow(this._extensionUri, this._globalState);
          break;
        case 'openExternal':
          if (message.url === 'command:xDesignSystem.open') {
            ThemeStudioPanel.createOrShow(this._extensionUri, this._globalState);
          } else if (message.url) {
            await vscode.env.openExternal(vscode.Uri.parse(message.url));
          }
          break;
        case 'saveThemeStateV2':
          if ('theme' in message && message.theme) {
            await this._globalState.update('activeThemeV2', message.theme);
            // Sync live with main canvas panel if active
            if (ThemeStudioPanel.currentPanel) {
              ThemeStudioPanel.currentPanel.postMessage({
                type: 'restoreStateV2',
                theme: message.theme
              });
            }
          }
          break;
        case 'saveThemeState':
          if ('theme' in message && message.theme) {
            await this._globalState.update('activeTheme', message.theme);
            if (ThemeStudioPanel.currentPanel) {
              ThemeStudioPanel.currentPanel.postMessage({
                type: 'restoreState',
                theme: message.theme
              });
            }
          }
          break;
        case 'getPersistedState': {
          const savedThemeV2 = this._globalState.get<ThemeConfigV2>('activeThemeV2');
          const savedThemeV1 = this._globalState.get<ThemeConfig>('activeTheme');
          if (savedThemeV2) {
            webviewView.webview.postMessage({
              type: 'restoreStateV2',
              theme: savedThemeV2
            });
          } else if (savedThemeV1) {
            webviewView.webview.postMessage({
              type: 'restoreState',
              theme: savedThemeV1
            });
          }
          break;
        }
        case 'copyToClipboard':
          if ('text' in message && message.text) {
            await vscode.env.clipboard.writeText(message.text);
            vscode.window.showInformationMessage('Copied to clipboard!');
          }
          break;
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const webviewDir = vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview');
    const indexPath = path.join(webviewDir.fsPath, 'index.html');

    let html = '';
    try {
      html = fs.readFileSync(indexPath, 'utf8');
    } catch {
      html = `<!DOCTYPE html><html><body><h2>Error loading sidebar webview</h2></body></html>`;
      return html;
    }

    const nonce = getNonce();
    const baseUri = webview.asWebviewUri(webviewDir);
    const cspSource = webview.cspSource;

    const cspMeta = `<meta http-equiv="Content-Security-Policy" content="
      default-src 'none';
      style-src ${cspSource} 'unsafe-inline' https://fonts.googleapis.com;
      font-src ${cspSource} https://fonts.gstatic.com;
      script-src 'nonce-${nonce}' ${cspSource};
      img-src ${cspSource} data: https:;
      connect-src https://www.googleapis.com https://fonts.googleapis.com;
    ">`;

    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n    ${cspMeta}\n    <base href="${baseUri}/">`);
    }

    // Inject sidebar mode flag so React renders the compact sidebar UI
    html = html.replace('<body>', `<body><script nonce="${nonce}">window.VSCODE_VIEW_MODE = 'sidebar';</script>`);
    html = html.replace(/<script /g, `<script nonce="${nonce}" `);

    return html;
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
