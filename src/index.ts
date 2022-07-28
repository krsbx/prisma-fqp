import { FQP } from 'filter-query-parser';
import { Options } from './utils/interface';
import parser from './utils/prismaFqp';

const prismaFQP = (
  filters: string,
  options: Options = { caseSensitive: true }
) => {
  if (filters.trim() === '') {
    return {};
  }

  const fqpParse = FQP.parser(filters);

  return parser(fqpParse, options);
};

export = prismaFQP;
