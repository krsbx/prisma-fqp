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
  BETWEEN: 'between',
  'NOT BETWEEN': 'between',
  'EXACTLY MATCHES': 'equals',
} as const;

export const OPERATOR_KEYS = Object.keys(OPERATOR).reduce(
  (curr, value) => ({
    ...curr,
    [value]: value,
  }),
  {} as OperatorKeyMap
);

export const MATCH_SETTINGS = {
  DEFAULT: 'default',
  INSENSITIVE: 'insensitive',
} as const;
