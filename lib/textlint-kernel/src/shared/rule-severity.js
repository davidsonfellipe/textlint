// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var SeverityLevel_1 = require("./type/SeverityLevel");
/**
 * get severity level from ruleConfig.
 * @param {Object|boolean|undefined} ruleConfig
 * @returns {number}
 */
function getSeverity(ruleConfig) {
    if (ruleConfig === undefined) {
        return SeverityLevel_1.default.error;
    }
    // rule:<true|false>
    if (typeof ruleConfig === "boolean") {
        return ruleConfig ? SeverityLevel_1.default.error : SeverityLevel_1.default.none;
    }
    if (ruleConfig.severity) {
        assert(SeverityLevel_1.default[ruleConfig.severity] !== undefined, "please set\n\"rule-key\": {\n    \"severity\": \"<warning|error>\"\n}");
        return SeverityLevel_1.default[ruleConfig.severity];
    }
    return SeverityLevel_1.default.error;
}
exports.getSeverity = getSeverity;