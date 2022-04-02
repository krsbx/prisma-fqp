"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filter_query_parser_1 = require("filter-query-parser");
const prismaFqp_1 = __importDefault(require("./utils/prismaFqp"));
const PrismaFQP = (filters) => {
    const fqpParse = filter_query_parser_1.FQP.parser(filters);
    return (0, prismaFqp_1.default)(fqpParse);
};
exports.default = PrismaFQP;
