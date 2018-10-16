import moment from 'moment';
import getRandomNumber from './getRandomNumber';

export default (format?: string, start?: string | null, end?:string): moment.Moment => {
  const endDate = end ? moment(end, format).valueOf() : moment().valueOf();
  const startDate = start ? moment(start, format).valueOf() : 0;
  return moment(getRandomNumber({ limit: [startDate, endDate] }));
}
