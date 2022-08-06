import prismaFQP from '../src/index';
import { OPERATOR, MATCH_SETTINGS } from '../src/utils/constants';

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

  it('It can parse null filter', () => {
    const result = prismaFQP('username null');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        username: {
          [OPERATOR['=']]: null,
        },
      },
    });
  });

  it('It can parse not null filter', () => {
    const result = prismaFQP('username not null');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        username: {
          [OPERATOR.NOT]: {
            [OPERATOR['=']]: null,
          },
        },
      },
    });
  });

  it('It can parse does not contain filter', () => {
    const result = prismaFQP('username does not contain "krsbx"');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        username: {
          [OPERATOR.NOT]: {
            [OPERATOR.CONTAINS]: 'krsbx',
          },
        },
      },
    });
  });

  it('It can parse between filter', () => {
    const result = prismaFQP('id between (1,10)');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        id: {
          [OPERATOR['>=']]: 1,
          [OPERATOR['<=']]: 10,
        },
      },
    });
  });

  it('It can parse not between filter', () => {
    const result = prismaFQP('id not between (1,10)');

    expect(result).toEqual({
      [OPERATOR.AND]: {
        id: {
          [OPERATOR['<']]: 1,
          [OPERATOR['>']]: 10,
        },
      },
    });
  });
});
