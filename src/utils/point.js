import dayjs from 'dayjs';

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
  const quantityMinutes = Math.round(end.diff(start) / 60000);
  let days = Math.floor(quantityMinutes / 1440);
  let hours = (quantityMinutes >= 1440) ?
    Math.floor(quantityMinutes % 1440 / 60) : Math.floor(quantityMinutes / 60);
  let minutes = (quantityMinutes >= 60) ? (quantityMinutes % 60) : quantityMinutes;

  if (days < 10) days = '0' + days;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

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
    if (key === type) {
      return array[key];
    }
  }
};

export { formatDate, calculateDuration, getArrayForType };
