import { FQP } from 'filter-query-parser';
import parser from './utils/prismaFqp';

const PrismaFQP = (filters: string) => {
  if (filters.trim() === '') {
    return {};
  }

  const fqpParse = FQP.parser(filters);

  return parser(fqpParse);
};

export default PrismaFQP;
