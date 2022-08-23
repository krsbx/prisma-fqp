import type { Rule } from 'filter-query-parser';
import type { AnyRecord } from './interface';

const assign = (obj: AnyRecord, keyPath: string, value: Rule['value']) => {
  const path = keyPath.split('.');
  const lastKeyIndex = path.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = path[i];

    if (!(key in obj)) obj[key] = {};

    obj = obj[key];
  }

  obj[path[lastKeyIndex]] = value;

  return obj;
};

export = assign;
