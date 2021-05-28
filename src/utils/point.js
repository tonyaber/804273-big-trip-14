import dayjs from 'dayjs';
import { TimeForFormat } from '../const.js';

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

/**
 * функция считает промежуток во времени
 *
 * @param {date} start - начало промежутка
 * @param {date} second - конец промежутка
 * @returns {string} - возвращает промежуток в формате ${hours}H ${minutes}M
 * если прошло меньше часа, то возвращает ${minutes}M
 */
const calculateDuration = (start, end) => {
  const quantityMinutes = Math.round(end.diff(start) / TimeForFormat.MILLISECOND);
  let days = Math.floor(quantityMinutes / TimeForFormat.DAY);
  let hours = (quantityMinutes >= TimeForFormat.DAY) ?
    Math.floor(quantityMinutes % TimeForFormat.DAY / TimeForFormat.MINUTE)
    : Math.floor(quantityMinutes / TimeForFormat.MINUTE);
  let minutes = (quantityMinutes >= TimeForFormat.MINUTE) ?
    (quantityMinutes % TimeForFormat.MINUTE) : quantityMinutes;

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


//поиск удобств в зависимости от типа
const getArrayForType = (array, type) => {
  for (const key in array) {
    if (array[key].type === type) {
      return array[key];
    }
  }
};

export { formatDate, calculateDuration, getArrayForType };
