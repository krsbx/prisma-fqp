import { OPERATOR } from './constants';

export type OperatorKey = keyof typeof OPERATOR;
export type OperatorType = typeof OPERATOR[OperatorKey];

export interface IRules {
  field: string;
  operator: OperatorKey;
  value: string | number;
}

export interface IFQP {
  condition: OperatorKey;
  rules: IRules[];
}
