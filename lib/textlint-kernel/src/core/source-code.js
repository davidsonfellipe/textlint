"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var StructuredSource = require("structured-source");
var ast_node_types_1 = require("@textlint/ast-node-types");
/**
 * Validates that the given AST has the required information.
 * @param {TxtAST.TxtNode} [ast] The Program node of the AST to check.
 * @throws {Error} If the AST doesn't contain the correct information.
 * @returns {void}
 * @private
 */
function validate(ast) {
    if (!ast.loc) {
        throw new Error("AST is missing location information.");
    }
    if (!ast.range) {
        throw new Error("AST is missing range information");
    }
}
/**
 * This class represent of source code.
 */
var SourceCode = /** @class */ (function () {
    /**
     * @param {string} text
     * @param {Object} ast
     * @param {string} ext
     * @param {string} [filePath]
     */
    function SourceCode(_a) {
        var _b = _a.text, text = _b === void 0 ? "" : _b, ast = _a.ast, ext = _a.ext, filePath = _a.filePath;
        validate(ast);
        assert(ext || filePath, "should be set either of fileExt or filePath.");
        this.hasBOM = text.charCodeAt(0) === 0xfeff;
        this.text = this.hasBOM ? text.slice(1) : text;
        /**
         * @type StructuredSource
         */
        this._structuredSource = new StructuredSource(this.text);
        this.ast = ast;
        this.filePath = filePath;
        /**
         * fileType .md .txt ...
         * @type {string}
         */
        this.ext = ext;
    }
    /**
     * @returns {ASTNodeTypes}
     */
    SourceCode.prototype.getSyntax = function () {
        return ast_node_types_1.ASTNodeTypes;
    };
    /**
     * get filePath
     * @returns {string|undefined}
     */
    SourceCode.prototype.getFilePath = function () {
        return this.filePath;
    };
    /**
     * Gets the source code for the given node.
     * @param {TxtNode=} node The AST node to get the text for.
     * @param {int=} beforeCount The number of characters before the node to retrieve.
     * @param {int=} afterCount The number of characters after the node to retrieve.
     * @returns {string|null} The text representing the AST node.
     */
    SourceCode.prototype.getSource = function (node, beforeCount, afterCount) {
        var currentText = this.text;
        if (currentText == null) {
            return null;
        }
        if (node) {
            var start = Math.max(node.range[0] - (beforeCount || 0), 0);
            var end = node.range[1] + (afterCount || 0);
            return currentText.slice(start, end);
        }
        else {
            return currentText;
        }
    };
    // StructuredSource wrapper
    /**
     * @param {SourceCodeLocation} loc - location indicator.
     * @return {[ number, number ]} range.
     */
    SourceCode.prototype.locationToRange = function (loc) {
        return this._structuredSource.locationToRange(loc);
    };
    /**
     * @param {[ number, number ]} range - pair of indice.
     * @return {SourceCodeLocation} location.
     */
    SourceCode.prototype.rangeToLocation = function (range) {
        return this._structuredSource.rangeToLocation(range);
    };
    /**
     * @param {Position} pos - position indicator.
     * @return {number} index.
     */
    SourceCode.prototype.positionToIndex = function (pos) {
        return this._structuredSource.positionToIndex(pos);
    };
    /**
     * @param {number} index - index to the source code.
     * @return {Position} position.
     */
    SourceCode.prototype.indexToPosition = function (index) {
        return this._structuredSource.indexToPosition(index);
    };
    return SourceCode;
}());
exports.default = SourceCode;