"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const fqpParser = (fqp) => {
    const { condition, rules } = fqp;
    const result = {};
    rules.forEach((rule) => {
        var _a;
        // If its a new Parser fields
        if (!rule.field) {
            return (result[condition] = Object.assign(Object.assign({}, result[condition]), fqpParser(rule)));
        }
        const { field, operator, value } = rule;
        const op = operator.toUpperCase();
        const validOp = constants_1.OPERATOR[op];
        if (!validOp)
            return;
        result[condition] = Object.assign(Object.assign({}, result[condition]), { [field]: Object.assign(Object.assign({}, (_a = result[condition]) === null || _a === void 0 ? void 0 : _a[field]), { [validOp]: value }) });
    });
    return result;
};
exports.default = fqpParser;
