import type { Parser } from 'filter-query-parser';
import cleanup from './cleanup';
import fqpParser from './parser';
import { AnyRecord, OperatorType } from './interface';

// Change notEquals to { not : { equals: value } }
const cleanupFqp = (result: AnyRecord) => {
  const keys = Object.keys(result);

  keys.forEach((key) => {
    const value = result[key];

    switch (typeof value) {
      case 'object':
        result[key] = cleanupFqp(value);
        break;
      default:
        cleanup(result, key as OperatorType, value);
        break;
    }
  });

  return result;
};

const fqpPrisma = (fqp: Parser) => {
  const rawParse = fqpParser(fqp);
  const cleanParse = cleanupFqp(rawParse);

  return cleanParse;
};

export default fqpPrisma;
