import type { Parser } from 'filter-query-parser';
import cleanupFilter from './cleanup';
import { AnyRecord, Options } from './interface';

const createFilter = <
  T extends Omit<ReturnType<typeof cleanupFilter>, 'field' | 'inRange'>
>({
  isString,
  validOp,
  value,
}: T) => {
  const filter = {
    [validOp]: value,
  };

  if (!isString) return filter;

  return filter;
};

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

    const { field, validOp, value, inRange, isString } = cleanupFilter(rule);

    if (!validOp) return;

    const filter = createFilter({ isString, validOp, value });

    result[condition] = {
      ...result[condition],
      [field]: {
        ...result[condition]?.[field],
        ...(inRange && typeof value === 'object' ? value : filter),
      },
    };
  });

  return result;
};

export default fqpParser;
