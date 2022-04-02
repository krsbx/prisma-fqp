"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanup_1 = __importDefault(require("./cleanup"));
const parser_1 = __importDefault(require("./parser"));
// Change notEquals to { not:{ equals: value } }
const cleanupFqp = (result) => {
    const keys = Object.keys(result);
    keys.forEach((key) => {
        const value = result[key];
        switch (typeof value) {
            case 'object':
                result[key] = cleanupFqp(value);
                break;
            default:
                (0, cleanup_1.default)(result, key, value);
                break;
        }
    });
    return result;
};
const fqpPrisma = (fqp) => {
    const rawParse = (0, parser_1.default)(fqp);
    const cleanParse = cleanupFqp(rawParse);
    return cleanParse;
};
exports.default = fqpPrisma;
