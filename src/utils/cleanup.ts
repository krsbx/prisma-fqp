import { OperatorType } from './interface';

const cleanup = (
  result: Record<any, any>,
  key: OperatorType,
  value: number | string
) => {
  switch (key) {
    case 'notEquals':
      delete result.notEquals;
      result.not = {
        equals: value,
      };
      break;

    case 'notIn':
      delete result.notIn;
      result.not = {
        in: value,
      };
      break;
    default:
      break;
  }
};

export default cleanup;
