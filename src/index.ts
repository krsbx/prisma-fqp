import { FQP } from 'filter-query-parser';
import parser from './utils/prismaFqp';

const PrismaFQP = (filters: string) => {
  const fqpParse = FQP.parser(filters);

  return parser(fqpParse);
};

export default PrismaFQP;
