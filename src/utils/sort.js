import dayjs from 'dayjs';

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

export { sortDay, sortTime, sortPrice };
