import { FQP } from 'filter-query-parser';
import prismaFqp from './utils/prismaFqp';

const main = (filters: string) => {
  const fqpParse = FQP.parser(filters);

  return prismaFqp(fqpParse);
};

export default main;
