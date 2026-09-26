import * as vscode from 'vscode';
import { ThemeStudioPanel } from './ThemeStudioPanel';

export function activate(context: vscode.ExtensionContext) {
  console.log('X Design System extension is now active');

  // Register command to open X Design System
  const openCommand = vscode.commands.registerCommand('xDesignSystem.open', () => {
    ThemeStudioPanel.createOrShow(context.extensionUri, context.globalState);
  });

  context.subscriptions.push(openCommand);

  // Register WebviewPanelSerializer for restoring webview state on VS Code restart
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(ThemeStudioPanel.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        ThemeStudioPanel.revive(webviewPanel, context.extensionUri, context.globalState);
      }
    });
  }
}

export function deactivate() {}
