import { OPERATOR } from './constants';

export type OperatorKey = keyof typeof OPERATOR;

export type OperatorType = typeof OPERATOR[OperatorKey];

export type OperatorKeyMap = Record<OperatorKey, OperatorKey>;

export interface Rules {
  field: string;
  operator: OperatorKey;
  value: string | number | symbol | boolean | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

export type Key = string | symbol | number;
