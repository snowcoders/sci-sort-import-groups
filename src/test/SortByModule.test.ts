import * as vscode from 'vscode';

import { expect } from 'chai';
import { sortImportGroupsForStrings } from '../SortByModule';

describe("SortByModule", () => {
    describe("sort method", () => {
        describe("Sort by path", () => {
            it("Already sorted", () => {
                let input = [
                    "import * as hey from 'hey1';",
                    "import * as hey from 'hey2';"];
                let expected = [
                    "import * as hey from 'hey1';",
                    "import * as hey from 'hey2';"];
                let edits = sortImportGroupsForStrings(input);
                expect(edits).to.exist;
                expect(edits).to.deep.equal(expected);
            });
            it("Not sorted", () => {
                let input = [
                    "import * as hey from 'hey2';",
                    "import * as hey from 'hey1';"];
                let expected = [
                    "import * as hey from 'hey1';",
                    "import * as hey from 'hey2';"];
                let edits = sortImportGroupsForStrings(input);
                expect(edits).to.exist;
                expect(edits).to.deep.equal(expected);
            });
            it("Blocked imports by comments shouldn't be sorted", () => {
                let input = [
                    "// This is the first block",
                    "import * as hey from 'hey2';",
                    "// This is the second block",
                    "import * as hey from 'hey1';"];
                let expected = [
                    "// This is the first block",
                    "import * as hey from 'hey2';",
                    "// This is the second block",
                    "import * as hey from 'hey1';"];
                let edits = sortImportGroupsForStrings(input);
                expect(edits).to.exist;
                expect(edits).to.deep.equal(expected);
            });
            it("Blocked imports by new lines shouldn't be sorted", () => {
                let input = [
                    "",
                    "import * as hey from 'hey2';",
                    "",
                    "import * as hey from 'hey1';"];
                let expected = [
                    "",
                    "import * as hey from 'hey2';",
                    "",
                    "import * as hey from 'hey1';"];
                let edits = sortImportGroupsForStrings(input);
                expect(edits).to.exist;
                expect(edits).to.deep.equal(expected);
            });
            it("Imports should be ordered in blocks", () => {
                let input = [
                    "",
                    "import * as hey from 'hey4';",
                    "import * as hey from 'hey3';",
                    "",
                    "import * as hey from 'hey2';",
                    "import * as hey from 'hey1';"];
                let expected = [
                    "",
                    "import * as hey from 'hey3';",
                    "import * as hey from 'hey4';",
                    "",
                    "import * as hey from 'hey1';",
                    "import * as hey from 'hey2';"];
                let edits = sortImportGroupsForStrings(input);
                expect(edits).to.exist;
                expect(edits).to.deep.equal(expected);
            });
            it("Multiline imports should be respected", () => {
                let input = [
                    "",
                    "import {",
                    "   a,",
                    "   b,",
                    "   c",
                    "   } from 'hey4';",
                    "import {",
                    "   d,",
                    "   e,",
                    "   f",
                    "   } from 'hey3';",
                    "",
                    "import * as hey from 'hey2';",
                    "import * as hey from 'hey1';"];
                let expected = [
                    "",
                    "import {",
                    "   d,",
                    "   e,",
                    "   f",
                    "   } from 'hey3';",
                    "import {",
                    "   a,",
                    "   b,",
                    "   c",
                    "   } from 'hey4';",
                    "",
                    "import * as hey from 'hey1';",
                    "import * as hey from 'hey2';"];
                let edits = sortImportGroupsForStrings(input);
                expect(edits).to.exist;
                expect(edits).to.deep.equal(expected);
            });
        });
    });
});