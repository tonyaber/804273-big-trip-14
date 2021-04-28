import { COUNT_PHOTO, DESCRIOTIONS, MAX_SIZE_PHOTO , MAX_SIZE_DESCRIPTION } from './const.js';
import { TYPES, ALL_OFFERS } from '../const.js';
import { getRandomNumber, getRandomArray, getRandomElementFromArray } from './utils.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

//поиск удобств в зависимости от типа
const getArrayForType = (array, type) => {
  const i = array.find((element) => element.type === type);
  return getRandomArray(i.offers);
};

//генерация фото
const photos = new Array(COUNT_PHOTO).fill('http://picsum.photos/248/152?r=').map((photo, index) => photo + index);

//функиция генерации обьекта сo случайным фото и описанием к нему
const generatePhoto = () => {
  return {
    src: getRandomElementFromArray(photos),
    description: getRandomElementFromArray(DESCRIOTIONS, MAX_SIZE_DESCRIPTION),
  };
};

//генерация описания
const DESCRIOTION = [
  {
    'description': getRandomArray(DESCRIOTIONS, MAX_SIZE_DESCRIPTION),
    'name': 'Amsterdam',
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  },
  {
    'description': getRandomArray(DESCRIOTIONS),
    'name': 'Chamonix',
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  },
  {
    'description': getRandomArray(DESCRIOTIONS),
    'name': 'Geneva',
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  },
  {
    'description': getRandomArray(DESCRIOTIONS),
    'name': 'Paris',
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  },
  {
    'description': getRandomArray(DESCRIOTIONS),
    'name': 'Berlin',
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  },
  {
    'description': getRandomArray(DESCRIOTIONS),
    'name': 'Dresden',
    'pictures': new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  },
];

export const generatePoint = () => {
  const dateFrom = dayjs().add(getRandomNumber(-20, 20), 'day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  const dateTo = dayjs(dateFrom).add(getRandomNumber(30, 160), 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  const type = getRandomElementFromArray(TYPES);
  return {
    basePrice: getRandomNumber(100, 1000),
    dateFrom,
    dateTo,
    description: getRandomElementFromArray(DESCRIOTION),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: getArrayForType(ALL_OFFERS, type.toLowerCase()),
    type,
  };
};

export { DESCRIOTION };
