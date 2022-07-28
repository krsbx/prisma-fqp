# Prisma Filter Query Parser

Filter Query Parser for Prisma ORM

Using [filter-query-parser](https://github.com/VJD7/filter-query-parser/) as the base

# How To Use

1. Create a new Middleware that can be use for all routes e.g. `parserMw`

- Javascript

```js
// Files :  parser.js

const prismaFQP = require('@krsbx/prisma-fqp');

exports.queryParserMw = (req, res, next) => {
  req.filterQueryParams = req.query.filters ? prismaFQP(req.query.filters as string) : {};
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

2. Use FQP Results in baseRepository/abstract base repository

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

###### This `baseRepository.ts` is using baseRepository that [prisma-repo](https://github.com/krsbx/prisma-repo) generate

# Unsupported Filter

Unfortunately since Prisma query structures is quite strict, `@krsbx/prisma-fqp` cannot convert this kind of filters
| Filters | Alternatives |
|:--------|:-------------|
|`BETWEEN`| use `>` or `>=` and `<` or `<=` with `and` condition|
|`NOT BETWEEN` | use the same approach with `BETWEEN` but with in reverse|
|`EXACTLY MATCHES`| - |

For `EXACTLY MATCHES` are still work in progress since there is an options on `prismaFQP` for enabling `caseSensitive`

The `caseSensitive` is still in progress as well
