import type { Rule } from 'filter-query-parser';
import { AnyRecord } from './interface';

const assign = (obj: AnyRecord, keyPath: string[], value: Rule['value']) => {
  const lastKeyIndex = keyPath.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];

    if (!(key in obj)) {
      obj[key] = {};
    }

    obj = obj[key];
  }

  obj[keyPath[lastKeyIndex]] = value;
};

export default assign;
