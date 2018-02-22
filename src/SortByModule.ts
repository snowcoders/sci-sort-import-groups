import * as vscode from 'vscode';

export const sortImportGroupsForDocument = (documentText: vscode.TextDocument, selectionStartLine: number, selectionEndLine: number) => {
    var lines = [];

    for (var i = selectionStartLine; i <= selectionEndLine; i++) {
        lines.push(documentText.lineAt(i).text);
    }

    let sortedLines = sortImportGroupsForStrings(lines);
    if (sortedLines == null) {
        return null;
    }
    else {
        return sortImportGroupsForStrings(lines).join('\n');;
    }
};

export const sortImportGroupsForStrings = (lines: string[]) => {
    let moduleNameToImportLines = new Map<string, string[]>();
    let outputLines: string[] = [];

    // First get the module names and the lines they correspond to
    for (let x = 0; x < lines.length; x++) {
        let line = lines[x];
        if (line.startsWith('import')) {
            let fullImportStatement = [line];
            while (!line.indexOf("'") && !line.indexOf('"')) {
                x++;
                line = lines[x];
                fullImportStatement.push(line);
            }

            let moduleName = getModuleName(fullImportStatement);
            if (moduleName == null) {
                vscode.window.showInformationMessage('Error occurred parsing import');
                return null;
            }

            // Fail if we get an already existing moduleName
            if (moduleNameToImportLines.has(moduleName)) {
                vscode.window.showInformationMessage('Duplicate module paths detected... All module paths must be unique');
                return null;
            }

            moduleNameToImportLines.set(moduleName, fullImportStatement);
        } else {
            // Flush moduleNameToImportLines
            for (let importLine of sortImportGroup(moduleNameToImportLines)) {
                outputLines.push(importLine);
            }

            // Push the line that breaks up the imports
            outputLines.push(line);

            // clear out the old import cache
            moduleNameToImportLines = new Map<string, string[]>();
        }
    }

    // Flush moduleNameToImportLines
    for (let importLine of sortImportGroup(moduleNameToImportLines)) {
        outputLines.push(importLine);
    }

    return outputLines;
};

const sortImportGroup = (moduleNameToImportLines: Map<string, string[]>) => {
    let outputLines: string[] = [];

    if (moduleNameToImportLines.size === 0) {
        return outputLines;
    }

    // Figure out the sorted order of the imports
    var sortedKeys = [];
    for (let key of moduleNameToImportLines.keys()) {
        sortedKeys.push(key);
    }
    sortedKeys.sort();

    // Now populate outputLines
    for (let key of sortedKeys) {
        let lines = moduleNameToImportLines.get(key);
        for (let line of lines) {
            outputLines.push(line);
        }
    }
    return outputLines;
};

export const getModuleName = (lines: string[]) => {
    var lastLine = lines[lines.length - 1] 
    if (!lastLine.indexOf("'") && !lastLine.indexOf('"')) {
        return null;
    }

    // If the import is on multiple lines, put it back together
    let singleImportLine = lines.map((line: string) => { return line.trim(); }).join();
    // This should be something like './importedFile';
    let moduleName = singleImportLine.substring(singleImportLine.lastIndexOf(' ') + 1);
    // strip off the first character and the last two
    moduleName = moduleName.substring(1, moduleName.length - 2);
    return moduleName;
};