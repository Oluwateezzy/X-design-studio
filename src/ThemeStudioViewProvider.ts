import * as vscode from 'vscode';
import { ThemeStudioPanel } from './ThemeStudioPanel';

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

    webviewView.webview.onDidReceiveMessage(async message => {
      if (message.type === 'openFullStudio') {
        ThemeStudioPanel.createOrShow(this._extensionUri, this._globalState);
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const webviewDir = vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview');
    const cspSource = webview.cspSource;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; script-src ${cspSource} 'unsafe-inline'; img-src ${cspSource} data:;">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      padding: 1rem;
      text-align: center;
    }
    .icon-box {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem auto 0.5rem auto;
      font-weight: 800;
      font-size: 1.5rem;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    .card {
      background: var(--vscode-sideBar-background);
      border: 1px solid var(--vscode-widget-border);
      border-radius: 10px;
      padding: 1.25rem 1rem;
      margin-top: 1rem;
    }
    .btn {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 0.65rem 1.2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      width: 100%;
      margin-top: 1rem;
      transition: opacity 0.2s;
    }
    .btn:hover {
      background: var(--vscode-button-hoverBackground);
    }
  </style>
</head>
<body>
  <div class="icon-box">X</div>
  <h3 style="margin: 0.5rem 0 0.25rem 0;">X Design System</h3>
  <p style="font-size: 0.78rem; opacity: 0.75; margin: 0;">100 Curated Color Themes & AI Spec Generator</p>

  <div class="card">
    <p style="font-size: 0.8rem; margin: 0; line-height: 1.4;">
      Customize colors, preview components, and export design specs.
    </p>
    <button class="btn" onclick="openStudio()">Open Studio (Cmd+Shift+T)</button>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    function openStudio() {
      vscode.postMessage({ type: 'openFullStudio' });
    }
  </script>
</body>
</html>`;
  }
}
