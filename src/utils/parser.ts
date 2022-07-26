import type { Parser } from 'filter-query-parser';
import { OPERATOR } from './constants';
import { AnyRecord, OperatorKey } from './interface';

const fqpParser = (fqp: Parser) => {
  const { condition, rules } = fqp;
  const result: AnyRecord = {};

  rules.forEach((rule) => {
    // If its a new Parser fields
    if (!rule.field) {
      return (result[condition] = {
        ...result[condition],
        ...fqpParser(rule as unknown as Parser),
      });
    }

    const { field, operator, value } = rule;

    const op = operator.toUpperCase() as OperatorKey;
    const validOp = OPERATOR[op];

    if (!validOp) return;

    result[condition] = {
      ...result[condition],
      [field]: {
        ...result[condition]?.[field],
        [validOp]: value,
      },
    };
  });

  return result;
};

export default fqpParser;
