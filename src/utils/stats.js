import dayjs from 'dayjs';
import { formatTime } from './point.js';
import { TimeForFormat } from '../const.js';

const countMoney = (points, type) => {
  const moneys = points.filter((point) => point.type.toLowerCase() === type.toLowerCase());

  if (!moneys.length) {
    return 0;
  }

  return moneys.map((point) => point.basePrice)
    .reduce((accumulator, price) => Number(accumulator) + Number(price));
};

const countTypes = (points, type) => points.filter((point) => point.type.toLowerCase() === type.toLowerCase()).length;

const countTime = (points, type) => {
  const time = points.filter((point) => point.type.toLowerCase() === type.toLowerCase());

  if (!time.length) {
    return 0;
  }

  return time.map((point) => dayjs(point.dateTo).diff(dayjs(point.dateFrom)))
    .reduce((accumulator, time) => accumulator + time);
};

const formatTimeForStats = (millisecond) => {
  return formatTime(Math.round(millisecond / TimeForFormat.MILLISECOND));
};

export { countMoney, countTime, countTypes, formatTimeForStats};
