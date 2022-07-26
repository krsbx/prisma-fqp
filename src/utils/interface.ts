import { Parser as OriginalParser } from 'filter-query-parser';
import { OPERATOR } from './constants';

export type OperatorKey = keyof typeof OPERATOR;

export type OperatorType = typeof OPERATOR[OperatorKey];

export interface IRules {
  field: string;
  operator: OperatorKey;
  value: string | number | symbol | boolean | null;
}

export interface Parser extends OriginalParser {
  condition: OperatorKey;
  rules: IRules[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;
