// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sort messages by line and column
 * @param {TextlintMessage[]} messages
 * @returns {TextlintMessage[]}
 */
function sortByLineColumn(messages) {
    // sort by line and column
    return messages.sort(function (a, b) {
        var lineDiff = a.line - b.line;
        if (lineDiff === 0) {
            return a.column - b.column;
        }
        else {
            return lineDiff;
        }
    });
}
exports.default = sortByLineColumn;