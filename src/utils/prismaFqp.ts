import type { Parser } from 'filter-query-parser';
import fqpParser from './parser';
import { Options } from './interface';

const fqpPrisma = (fqp: Parser, options: Options = {}) => {
  const cleanParse = fqpParser(fqp, options);

  return cleanParse;
};

export default fqpPrisma;
