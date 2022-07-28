declare module 'filter-query-parser' {
  export type Rule = {
    field: string;
    operator: string;
    value: string | number | symbol | boolean | null | object;
  };

  export type Query = Rule & {
    condition: string;
    not: boolean;
  };

  export type Parser = {
    condition: string;
    rules: (Rule | Query)[];
    not: false;
  };

  export const FQP = {
    parse: () => any,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    stringify: (obj: Parser, customField: string) => string,
    parser: (query: string) => Parser,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  };
}
