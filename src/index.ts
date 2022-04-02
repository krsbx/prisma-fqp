// @ts-ignore
import { FQP } from 'filter-query-parser';
import prismaFqp from './utils/prismaFqp';

const main = (filters: any) => {
  const fqpParse = FQP.parser(filters);

  return prismaFqp(fqpParse);
};

export default main;
