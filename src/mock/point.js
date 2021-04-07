import { getRandomNumber, getRandomArray } from '../utils.js';
import { TYPES, CITIES, ALL_OFFERS } from '../const.js';
import { MAX_SIZE_PHOTO, MAX_SIZE_DESCRIPTION, COUNT_PHOTO, DESCRIOTIONS } from './const.js';
import dayjs from 'dayjs';

/**
  * функция возващает случайный элемент с массива
  *
  * @param {array} array - массив
  * @returns {string} - возвращает элемент массива
  */
const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

//создания массива фотографий
const photos = new Array(COUNT_PHOTO).fill('http://picsum.photos/248/152?r=').map((photo, index) => photo + index);

//функиция генерации обьекта сo случайным фото и описанием к нему
const generatePhoto = () => {
  return {
    src: getRandomElementFromArray(photos),
    description: getRandomElementFromArray(DESCRIOTIONS),
  };
};

//генерация данных для описания (город, его описание, набор фотографий и подписей к ним)
const generateDescription = () => {
  return {
    description: getRandomArray(DESCRIOTIONS, MAX_SIZE_DESCRIPTION),
    name: getRandomElementFromArray(CITIES),
    pictures: new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  };
};

export const generatePoint = () => {
  const dateFrom = dayjs().add(getRandomNumber(-20, 20), 'day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  const dateTo = dayjs(dateFrom).add(getRandomNumber(30, 160), 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  return {
    base_price: getRandomNumber(100, 1000),
    date_from: dateFrom,
    date_to: dateTo,
    description: generateDescription(),
    id: getRandomNumber(0, 10),
    is_favorite: Boolean(getRandomNumber(0, 1)),
    offers: getRandomArray(ALL_OFFERS),
    type: getRandomElementFromArray(TYPES),
  };
};
