import type { OperatorKeyMap } from './interface';

export const OPERATOR: Record<string, string> = {
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

export const CONDITION: Record<string, string> = {
  AND: 'AND',
  OR: 'OR',
} as const;

export const OPERATOR_KEYS = Object.keys(OPERATOR).reduce(
  (curr, value) => ({
    ...curr,
    [value]: value,
  }),
  {} as OperatorKeyMap
);
