import { OPERATOR } from './constants';
import { IFQP, OperatorKey } from './interface';

const fqpParser = (fqp: IFQP) => {
  const { condition, rules } = fqp;
  const result: Record<any, any> = {};

  rules.forEach((rule) => {
    // If its a new Parser fields
    if (!rule.field) {
      return (result[condition] = {
        ...result[condition],
        ...fqpParser(rule as unknown as IFQP),
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
