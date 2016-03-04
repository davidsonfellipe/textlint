// LICENSE : MIT
"use strict";
import assert from "power-assert";
import TextLintCore from "../src/textlint-core";
import ruleAdd from "./fixtures/fixer-rules/fixer-rule-add";
import ruleReplace from "./fixtures/fixer-rules/fixer-rule-replace";
import fs from "fs";
import {parse} from "markdown-to-ast";
import SourceCodeFixer from "../src/fixer/source-code-fixer";
import SourceCode from "../src/rule/source-code";
describe("textlint-fixer", function () {
    context("#fixText", function () {
        it("should return text added and replaced", function () {
            var textlint = new TextLintCore();
            textlint.setupRules({
                "fixer-rule-add": ruleAdd,
                "fixer-rule-replace": ruleReplace
            });
            return textlint.fixText("This is fix", ".md").then(result => {
                assert(typeof result.output === "string");
                assert(result.filePath === "<markdown>");
                assert.equal(result.applyingMessages.length, 2);
                assert.equal(result.remainingMessages.length, 0);
                assert.equal(result.output, "This is fixed.");
            });
        });
    });
    context("#fixFile", function () {
        it("should return text added and replaced", function () {
            var textlint = new TextLintCore();
            textlint.setupRules({
                "fixer-rule-add": ruleAdd,
                "fixer-rule-replace": ruleReplace
            });
            var filePath = __dirname + "/fixtures/fixer-rules/fix.md";
            return textlint.fixFile(filePath).then(result => {
                assert(typeof result.output === "string");
                assert(result.filePath === filePath);
                assert.equal(result.applyingMessages.length, 2);
                assert.equal(result.remainingMessages.length, 0);
                assert.equal(result.output, "This is fixed.");
            });
        });
    });
    context("reproduce from applyingMessages", function () {
        it("should return text added and replaced", function () {
            const textlint = new TextLintCore();
            textlint.setupRules({
                "fixer-rule-add": ruleAdd,
                "fixer-rule-replace": ruleReplace
            });
            const filePath = __dirname + "/fixtures/fixer-rules/fix.md";
            const text = fs.readFileSync(filePath, "utf-8");
            const sourceCode = new SourceCode({
                text,
                ast: parse(text),
                ext: ".md",
                filePath
            });
            return textlint.fixFile(filePath).then(result => {
                const reResult = SourceCodeFixer.sequentiallyApplyFixes(sourceCode, result.originalMessages);
                assert(reResult.fixed);
                assert.equal(reResult, result.output);
            });
        });
    });
});