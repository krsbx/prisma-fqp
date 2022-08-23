import type { Parser, Rule } from 'filter-query-parser';
import { CONDITION } from './constants';
import assign from './assign';
import convertFilter from './converter';
import type { Key } from './interface';

const extractFilters = (rules: (Rule | Parser)[]) => {
  const validRules: { [x: Key]: Rule['value'] }[] = [];

  if (Array.isArray(rules)) {
    for (const rule of rules) {
      if ((rule as Parser)?.condition) {
        const condition = CONDITION[(rule as Parser).condition];

        validRules.push({
          [condition]: extractFilters((rule as Parser).rules),
        });
      } else {
        const field = (rule as Rule).field;
        const { operation, value, inRange } = convertFilter(rule as Rule);

        const extendedPath = inRange ? '' : `.${operation}`;

        const obj = {};
        assign(obj, `${field}${extendedPath}`, value);

        validRules.push(obj);
      }
    }
  }

  return validRules;
};

export = extractFilters;
