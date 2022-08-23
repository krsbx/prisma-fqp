declare module 'filter-query-parser' {
  export type Rule = {
    field: string;
    operator: string;
    value: never | never[] | object | null;
  };

  export type Parser = {
    condition: string;
    rules: Rule[] | Parser[];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parse: () => any;
  const stringify: (obj: Parser) => string;
  const parser: (query: string) => Parser;

  export const FQP = {
    parse,
    stringify,
    parser,
  };
}
