import moment from 'moment';

export const convertRange = (value: never[]) => {
  if (moment(String(value[0]), 'YYYY-MM-DD', true).isValid())
    value[0] = moment(String(value[0])).toDate() as never;

  if (moment(String(value[1]), 'YYYY-MM-DD', true).isValid())
    value[1] = moment(String(value[1])).toDate() as never;
};
