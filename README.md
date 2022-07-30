# Prisma Filter Query Parser

Filter Query Parser for Prisma ORM

Using [filter-query-parser](https://github.com/VJD7/filter-query-parser/) as the base

# How To Use

1. Create a new Middleware that can be use for all routes e.g. `parserMw`

> This examples is an examples for a Backend that use [Express.js](https://www.npmjs.com/package/express)

- Javascript

```js
// Files :  parser.js

const prismaFQP = require('@krsbx/prisma-fqp');

exports.queryParserMw = (req, res, next) => {
  req.filterQueryParams = req.query.filters ? prismaFQP(req.query.filters) : {};
  delete req.query.filters;
  return next();
};
```

- Typescript

```ts
// Files :  parser.js

import prismaFQP from '@krsbx/prisma-fqp';

export const queryParserMw = (req, res, next) => {
  req.filterQueryParams = req.query.filters
    ? prismaFQP(req.query.filters as string)
    : {};
  delete req.query.filters;
  return next();
};
```

> Use [express-asyncmw](https://www.npmjs.com/package/express-asyncmw) to return a response error automatically on every Errors in your backend

2. Use FQP Results in baseRepository/abstract class BaseRepository

- Javascript

```js
// Files : baseRepository.js

exports.findAll = (
  conditions = {},
  filterQueryParams = {},
  options = {},
  include = {}
) => {
  /* {...} */

  const where = { ...conditions, ...filterQueryParams, ...otherOptions };

  /* {...} */
};
```

- Typescript

```ts
// Files : baseRepository.ts

async findAll<T extends typeof this.model>(conditions: Where, filterQueryParams: AnyRecord = {}, options: AnyRecord = {}, include: Include = {} as Include) {
  /* {...} */

    const where = { ...conditions, ...filterQueryParams, ...otherOptions };

    /* {...} */
  }
```

> This `baseRepository.ts` is using baseRepository that [prisma-repo](https://www.npmjs.com/package/prisma-repo) generate

# Case Sensitive filters

The `caseSensitive` is only available on certain databse provider. Read more about it in [Case-insensitive filtering](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering).

# Options

```ts
caseSensitive: boolean;
```

> Determine whether use a caseSensitive filters or not. Default is `false` which use the default value from Prisma. But, if it true it will use `insensitive` mode on filtering the results.
