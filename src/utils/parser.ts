import type { Parser } from 'filter-query-parser';
import cleanupFilter from './cleanup';
import { AnyRecord, Options } from './interface';

const fqpParser = (fqp: Parser, options: Options = {}) => {
  const { condition, rules } = fqp;
  const result: AnyRecord = {};

  rules.forEach((rule) => {
    // If its a new Parser fields
    if (!rule.field) {
      return (result[condition] = {
        ...result[condition],
        ...fqpParser(rule as unknown as Parser, options),
      });
    }

    const { field, validOp, value } = cleanupFilter(rule);

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
