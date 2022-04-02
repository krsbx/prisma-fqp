import { OPERATOR } from './constants';
export declare type OperatorKey = keyof typeof OPERATOR;
export declare type OperatorType = typeof OPERATOR[OperatorKey];
export interface IRules {
    field: string;
    operator: OperatorKey;
    value: string | number;
}
export interface IFQP {
    condition: OperatorKey;
    rules: IRules[];
}
