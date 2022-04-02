"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanup = (result, key, value) => {
    switch (key) {
        case 'notEquals':
            delete result.notEquals;
            result.not = {
                equals: value,
            };
            break;
        case 'notIn':
            delete result.notIn;
            result.not = {
                in: value,
            };
            break;
        default:
            break;
    }
};
exports.default = cleanup;
