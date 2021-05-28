import dayjs from 'dayjs';
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

const formatTime = (millisecond) => {
  const quantityMinutes = Math.round(millisecond / TimeForFormat.MILLISECOND);
  let days = Math.floor(quantityMinutes / TimeForFormat.DAY);
  let hours = (quantityMinutes >= TimeForFormat.DAY) ?
    Math.floor(quantityMinutes % TimeForFormat.DAY / TimeForFormat.MINUTE) : Math.floor(quantityMinutes / TimeForFormat.MINUTE);
  let minutes = (quantityMinutes >= TimeForFormat.MINUTE) ? (quantityMinutes % TimeForFormat.MINUTE) : quantityMinutes;

  if (days < TimeForFormat.STEP) {
    days = '0' + days;
  }
  if (hours < TimeForFormat.STEP) {
    hours = '0' + hours;
  }
  if (minutes < TimeForFormat.STEP) {
    minutes = '0' + minutes;
  }

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }
  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

export { countMoney, countTime, countTypes, formatTime };
