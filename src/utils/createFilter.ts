import assign from './assign';
import cleanupFilter from './cleanup';

type Params = Omit<ReturnType<typeof cleanupFilter>, 'field' | 'inRange'>;

const createFilter = ({ isString, validOp, value, nested }: Params) => {
  const filter = {
    [validOp]: value,
  };

  if (nested.length > 0) {
    const obj = {};

    assign(obj, nested, filter);

    return obj;
  }

  if (!isString) return filter;

  return filter;
};

export default createFilter;
