import prismaFQP from '../src/index';
import { OPERATOR } from '../src/utils/constants';

describe('Prisma Filter Query Parser', () => {
  it('It can accept empty filter', () => {
    const result = prismaFQP('');

    expect(result).toEqual({});
  });

  it('It can parse single filter', () => {
    const result = prismaFQP('field = "value"');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        field: {
          [OPERATOR['=']]: 'value',
        },
      },
    });
  });

  it('It can parse multiple filter', () => {
    const result = prismaFQP('username = "krsbx" and id = 1');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        id: {
          [OPERATOR['=']]: 1,
        },
        username: {
          [OPERATOR['=']]: 'krsbx',
        },
      },
    });
  });

  it('It can parse nested filter', () => {
    const result = prismaFQP(
      'username = "krsbx" and (id = 1 or email = "email@email.com")'
    );

    expect(result).toEqual({
      [OPERATOR.AND]: {
        username: {
          [OPERATOR['=']]: 'krsbx',
        },
        [OPERATOR.OR]: {
          id: {
            [OPERATOR['=']]: 1,
          },
          email: {
            [OPERATOR['=']]: 'email@email.com',
          },
        },
      },
    });
  });

  it('It can parse not operator', () => {
    const result = prismaFQP('username != "krsbx"');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        username: {
          [OPERATOR.NOT]: {
            [OPERATOR['=']]: 'krsbx',
          },
        },
      },
    });
  });
});
