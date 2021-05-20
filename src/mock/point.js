import { COUNT_PHOTO, DESCRIPTIONS, MAX_SIZE_PHOTO, MAX_SIZE_DESCRIPTION, CITIES, TYPE_WITH_OFFERS } from './const.js';
import { getArrayForType } from '../utils/point.js';
import { TYPES } from '../const.js';
import { getRandomNumber, getRandomArray, getRandomElementFromArray } from './utils.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

//генерация фото
const photos = new Array(COUNT_PHOTO).fill('http://picsum.photos/248/152?r=').map((photo, index) => photo + index);

//функиция генерации обьекта сo случайным фото и описанием к нему
const generatePhoto = () => {
  return {
    src: getRandomElementFromArray(photos),
    description: getRandomElementFromArray(DESCRIPTIONS, MAX_SIZE_DESCRIPTION),
  };
};

//генерация описания
const generateDescription = (city) => {
  return {
    'description': getRandomArray(DESCRIPTIONS, MAX_SIZE_DESCRIPTION),
    'name': city,
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  };
};

const descriptions = CITIES.map((city) => generateDescription(city));
export const generatePoint = () => {
  const dateFrom = dayjs().add(getRandomNumber(-28800, 28800), 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  const dateTo = dayjs(dateFrom).add(getRandomNumber(30, 160), 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  const type = getRandomElementFromArray(TYPES);
  const offersOfType = getArrayForType(TYPE_WITH_OFFERS, type.toLowerCase());
  return {
    basePrice: getRandomNumber(100, 1000),
    dateFrom,
    dateTo,
    description: getRandomElementFromArray(descriptions),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers:getRandomArray(offersOfType),
    type,
  };
};

export { descriptions };
