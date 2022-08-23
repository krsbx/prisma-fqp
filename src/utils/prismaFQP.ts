import type { Parser } from 'filter-query-parser';
import { CONDITION } from './constants';
import extractFilters from './parser';

const fqpParser = (filter: Parser) => {
  const dbCond = CONDITION[filter.condition];
  const parsedFilter = extractFilters(filter.rules);

  if (!dbCond) return {};

  const result = { [dbCond]: parsedFilter };

  return result;
};

export = fqpParser;
