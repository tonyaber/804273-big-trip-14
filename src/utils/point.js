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

  let hours = Math.floor(quantityMinutes / 60);
  let minutes = (quantityMinutes > 60) ? (quantityMinutes % 60) : quantityMinutes;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours > 0) {
    if (hours < 10) {
      hours = '0' + hours;
    }
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

/**
 * функции для сортировки
 *
 * @param {object} pointA - первый элемент моков
 * @param {object} pointB - следующий за ним элемент моков
 * @returns {number} положение элемента @param pointA,
 * если результат меньше нуля - @param pointA находится до @param pointB,
 * если результат больше нуля - @param pointA находится после  @param pointB
 */
const sortDay = (pointA, pointB) =>  dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));

const sortTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { formatDate, calculateDuration, sortDay, sortTime, sortPrice };
