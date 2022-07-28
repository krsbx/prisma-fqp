import { OperatorKeyMap } from './interface';

export const OPERATOR = {
  AND: 'AND',
  OR: 'OR',
  '<': 'lt',
  '<=': 'lte',
  '>': 'gt',
  '>=': 'gte',
  '=': 'equals',
  '!=': 'not',
  IN: 'in',
  NOT: 'not',
  'NOT IN': 'not',
  'STARTS WITH': 'startsWith',
  'ENDS WITH': 'endsWith',
  CONTAINS: 'contains',
  'DOES NOT CONTAIN': 'not',
  LIKE: 'contains',
  NULL: 'equals',
  'NOT NULL': 'not',
} as const;

export const OPERATOR_KEYS = Object.keys(OPERATOR).reduce(
  (curr, value) => ({
    ...curr,
    [value]: value,
  }),
  {} as OperatorKeyMap
);

export const MATCH_SETTINGS = {
  INSENSITIVE: 'insensitive',
  CASE_SENSITIVE: 'default',
} as const;
