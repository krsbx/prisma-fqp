import moment from 'moment';

export const isValidDate = (value: never) =>
  moment(value, 'YYYY-MM-DD', true).isValid();

export const toDate = (value: never) => moment(value).toDate() as never;

export const convertRange = (value: never[]) => {
  if (isValidDate(value[0])) value[0] = toDate(value[0]);

  if (isValidDate(value[1])) value[1] = toDate(value[1]);
};
