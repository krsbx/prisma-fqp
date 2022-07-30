import type { Rule, Query } from 'filter-query-parser';
import { OPERATOR, OPERATOR_KEYS } from './constants';
import { OperatorKey } from './interface';

const cleanupFilter = (rule: Rule | Query) => {
  const { field, operator } = rule;
  let value = rule.value;
  let inRange = false;

  const op = operator.toUpperCase() as OperatorKey;
  const validOp = OPERATOR[op];
  const isString = typeof value === 'string';

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

    case OPERATOR_KEYS.BETWEEN:
      inRange = true;

      if (Array.isArray(value)) {
        value = {
          [OPERATOR['>=']]: value[0],
          [OPERATOR['<=']]: value[1],
        };
      }
      break;

    case OPERATOR_KEYS['NOT BETWEEN']:
      inRange = true;

      // Reverse the operator
      if (Array.isArray(value)) {
        value = {
          [OPERATOR['<']]: value[0],
          [OPERATOR['>']]: value[1],
        };
      }
      break;

    default:
      break;
  }

  return { field, validOp, value, isString, inRange };
};

export default cleanupFilter;
