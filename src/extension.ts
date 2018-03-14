'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { format } from "@snowcoders/sortier";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.importSorter', () => {
    // The code you place here will be executed every time your command is executed
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No open text editor');
      return;
    }

    try {
      format(editor.document.fileName, {});
    }
    catch (e) {
      vscode.window.showErrorMessage("Sortier threw an error: " + e.message);
    }
  });

  context.subscriptions.push(disposable);

  const extensionName = 'sci-sort-import-groups';
  if (vscode.workspace.getConfiguration(extensionName).get<Boolean>('onSave')) {
    vscode.workspace.onWillSaveTextDocument(onSaveListener);
  };
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function onSaveListener({ document, waitUntil }: vscode.TextDocumentWillSaveEvent) {
  const sortedText = format(document.fileName, {});
  if (!sortedText) {
    return;
  }

  const edits = Promise.resolve([new vscode.TextEdit(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE), sortedText)]);
  waitUntil(edits);
}