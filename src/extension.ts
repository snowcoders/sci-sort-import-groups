'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { sortImportGroupsForDocument } from './SortByModule';

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

        let selection = editor.selection;
        let startLine = selection.start.line;
        let endLine = selection.end.line;
        // If the selection is all on a single line
        if (selection.start.line === selection.end.line &&
            selection.start.character !== selection.end.character) {
            return;
        }
        // If nothing is selected, we should just run on the whole document
        if (selection.start.line === selection.end.line &&
            selection.start.character === selection.end.character) {
            startLine = 0;
            endLine = editor.document.lineCount - 1;
        }

        let sorted = sortImportGroupsForDocument(editor.document, startLine, endLine);

        if (sorted != null) {
            editor.edit(function (editBuilder) {
                var range = new vscode.Range(
                    startLine,
                    0,
                    endLine,
                    editor.document.lineAt(endLine).text.length);
                editBuilder.replace(range, sorted);
            });
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}