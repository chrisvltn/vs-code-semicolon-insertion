'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Disposable, TextEditor, TextDocument, Selection, TextEditorEdit, TextLine, Range, Position } from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let runInsertion = (newLine: boolean): void => {
		let editor: TextEditor = vscode.window.activeTextEditor;
		let selections: Selection[] = editor.selections;
		var doc: TextDocument = editor.document;

		editor.edit(function (edit: TextEditorEdit): void {
			selections.forEach((selection: Selection, index: number) => {
				for (let i = selection.start.line; i <= selection.end.line; i++) {
					let selLine: TextLine = doc.lineAt(i);
					let insertPos: Range = selLine.range;
					let insertLineText: string = selLine.text;

					// Insert semicolon, if it needs it
					edit.replace(insertPos, insertSemicolon(insertLineText, newLine));
				}
			});
		}).then(() => {
			if (newLine) {
				// Move cursor to the next line
				vscode.commands.executeCommand("cursorMove", {
					to: "down",
					by: "wrappedLine",
					select: false,
					value: 1
				}).then(() => {
					vscode.commands.executeCommand("cursorMove", {
						to: "wrappedLineEnd",
						by: "wrappedLine",
						select: false
					});
				});
			}
		});
	};

	let disposables: Disposable[] = [
		vscode.commands.registerCommand('extension.insertSemicolon', () => {
			runInsertion(false);
		}),
		vscode.commands.registerCommand('extension.insertSemicolonWithNewLine', () => {
			runInsertion(true);
		})
	];

	disposables.forEach((disposable: Disposable) => context.subscriptions.push(disposable));
}

// this method is called when your extension is deactivated
export function deactivate() {
}

/**
 * Inserts a semicolon at the end of a text
 * @param str Text that needs a semicolon at the end
 * @param newLine If it will add a new line at the end
 */
export function insertSemicolon(str: string, newLine: boolean = false): string {
	if (!str.trim().length || str.trim().split('').pop() == ';') return str;

	let indentString: string = getIndentString(str);
	return indentString + str.trim() + ';' + (newLine ? '\n' + indentString : '');
};

/**
 * Get the indentation string of a line
 * @param str String to get the indentation text
 */
export function getIndentString(str: string): string {
	return (str.match(/^\s+/) || ['']).shift();
}
