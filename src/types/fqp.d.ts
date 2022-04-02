declare module 'filter-query-parser' {
  interface IFQP {
    parse: () => any;
    stringify: (obj: Record<any, any>, customField: string) => string;
    parser: (query: string) => any;
  }

  export const FQP: IFQP;
}
