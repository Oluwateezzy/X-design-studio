import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Vibe Theme Studio extension activated');

  const disposable = vscode.commands.registerCommand('vibeThemeStudio.open', () => {
    vscode.window.showInformationMessage('Opening Vibe Theme Studio...');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
