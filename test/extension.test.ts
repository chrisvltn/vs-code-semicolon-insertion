//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import { insertSemicolon, getIndentString } from "../src/extension";

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    test('Inserting Semicolon', () => {
        // Inserting semicolon where there isn't one
        // Basic insertion
        assert.equal('text without semicolon;', insertSemicolon('text without semicolon'));

        // Insertion with new line
        assert.equal('text without semicolon;\n', insertSemicolon('text without semicolon', true));

        // Insertion with new line and indentation
        assert.equal('\ttext without semicolon;\n\t', insertSemicolon('\ttext without semicolon', true));

        // Insertion with indentation but without new line
        assert.equal('\ttext without semicolon;', insertSemicolon('\ttext without semicolon'));


        // Inserting semicolon where there is one
        // Basic insertion
        assert.equal('text with semicolon;', insertSemicolon('text with semicolon;'));

        // Insertion with new line
        assert.equal('text with semicolon;', insertSemicolon('text with semicolon;', true));

        // Insertion with new line and indentation
        assert.equal('\ttext with semicolon;', insertSemicolon('\ttext with semicolon;', true));

        // Insertion with indentation but with new line
        assert.equal('\ttext with semicolon;', insertSemicolon('\ttext with semicolon;'));
    });

    test('Getting indentation', () => {
        assert.equal('\t\t', getIndentString('\t\tGet my indentation'));
        assert.equal('   ', getIndentString('   Get my indentation'));
        assert.equal('  ', getIndentString('  Get my indentation'));
        assert.equal('   \t    ', getIndentString('   \t    Get my indentation'));
    });
});
