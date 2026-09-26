import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ThemeStudioPanel } from './ThemeStudioPanel';
import type { ThemeConfig, WebviewToExtensionMessage } from './messages';

export class ThemeStudioViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'xDesignSystemSidebarView';

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _globalState: vscode.Memento
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview'),
        vscode.Uri.joinPath(this._extensionUri, 'public')
      ]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message: WebviewToExtensionMessage | { type: string; url?: string; theme?: ThemeConfig }) => {
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
        case 'saveThemeState':
          if (message.theme) {
            await this._globalState.update('activeTheme', message.theme);
            // Sync live with open main panel if active
            if (ThemeStudioPanel.currentPanel) {
              ThemeStudioPanel.currentPanel.postMessage({
                type: 'restoreState',
                theme: message.theme
              });
            }
          }
          break;
        case 'getPersistedState':
          const savedTheme = this._globalState.get<ThemeConfig>('activeTheme');
          webviewView.webview.postMessage({
            type: 'restoreState',
            theme: savedTheme
          });
          break;
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
