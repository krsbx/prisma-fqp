import cleanup from './cleanup';
import { IFQP, OperatorType } from './interface';
import fqpParser from './parser';

// Change notEquals to { not:{ equals: value } }
const cleanupFqp = (result: Record<any, any>) => {
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

const fqpPrisma = (fqp: IFQP) => {
  const rawParse = fqpParser(fqp);
  const cleanParse = cleanupFqp(rawParse);

  return cleanParse;
};

export default fqpPrisma;
