import type { Rule } from 'filter-query-parser';
import { convertRange, isValidDate, toDate } from './common';
import { OPERATOR, OPERATOR_KEYS } from './constants';
import type { OperatorKey } from './interface';

const convertFilter = (rule: Rule) => {
  const op = rule.operator.toUpperCase() as OperatorKey;
  const operation = OPERATOR[op] ?? op;
  let value = rule.value;
  let inRange = false;

  if (isValidDate(value as never)) value = toDate(value as never);

  switch (op) {
    case OPERATOR_KEYS.NULL:
      value = null;
      break;

    case OPERATOR_KEYS['NOT NULL']:
      value = {
        [OPERATOR['=']]: null,
      };
      break;

    case OPERATOR_KEYS['!=']:
      value = {
        [OPERATOR['=']]: value,
      };
      break;

    case OPERATOR_KEYS['NOT IN']:
      value = {
        [OPERATOR.IN]: value,
      };
      break;

    case OPERATOR_KEYS['DOES NOT CONTAIN']:
      value = {
        [OPERATOR.CONTAINS]: value,
      };
      break;

    case OPERATOR_KEYS.BETWEEN:
      inRange = true;

      if (Array.isArray(value)) {
        convertRange(value as never);

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
        convertRange(value as never);

        value = {
          [OPERATOR['<']]: value[0],
          [OPERATOR['>']]: value[1],
        };
      }
      break;
  }

  return {
    operation,
    value,
    inRange,
  };
};

export = convertFilter;
