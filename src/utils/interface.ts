import { Parser as OriginalParser } from 'filter-query-parser';
import { OPERATOR, MATCH_SETTINGS } from './constants';

export type OperatorKey = keyof typeof OPERATOR;

export type OperatorType = typeof OPERATOR[OperatorKey];

export type OperatorKeyMap = Record<OperatorKey, OperatorKey>;

export interface Rules {
  field: string;
  operator: OperatorKey;
  value: string | number | symbol | boolean | null;
}

export interface Parser extends OriginalParser {
  condition: OperatorKey;
  rules: Rules[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

export type Options = {
  caseSensitive?: boolean;
};

export type CaseSensitiveType =
  typeof MATCH_SETTINGS[keyof typeof MATCH_SETTINGS];
