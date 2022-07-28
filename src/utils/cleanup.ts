import type { Rule, Query } from 'filter-query-parser';
import { OPERATOR, OPERATOR_KEYS } from './constants';
import { OperatorKey } from './interface';

const cleanupFilter = (rule: Rule | Query) => {
  const { field, operator } = rule;
  let value = rule.value;

  const op = operator.toUpperCase() as OperatorKey;
  const validOp = OPERATOR[op];

  switch (op) {
    case OPERATOR_KEYS.NULL:
      value = null;
      break;

    case OPERATOR_KEYS['NOT NULL']:
      // ValidOp value is 'not'
      value = {
        [OPERATOR['=']]: null,
      };
      break;

    case OPERATOR_KEYS['!=']:
      // ValidOp value is 'not'
      value = {
        [OPERATOR['=']]: value,
      };
      break;

    case OPERATOR_KEYS['NOT IN']:
      // ValidOp value is 'not'
      value = {
        [OPERATOR.IN]: value,
      };
      break;

    case OPERATOR_KEYS['DOES NOT CONTAIN']:
      // ValidOp value is 'not'
      value = {
        [OPERATOR.CONTAINS]: value,
      };
      break;

    default:
      break;
  }

  return { field, validOp, value };
};

export default cleanupFilter;
