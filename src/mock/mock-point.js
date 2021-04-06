import { getRandomNumber, getRandomArray } from '../utils.js';
import { types, cities, allOffers } from '../const.js';
import dayjs from 'dayjs';

//константы
const MAX_SIZE_DESCRIPTION = 5;
const COUNT_PHOTO = 50;
const MAX_SIZE_PHOTO = 6;

//генерация случайных данных с массива для заполнения
const generateDate = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
];

//создания массива фотографий
const photos = new Array(COUNT_PHOTO).fill('http://picsum.photos/248/152?r=').map((photo, index) => photo + index);

//функиция генерации обьекта сo случайнм фото и описанием к нему
const generatePhoto = () => {
  return {
    src: generateDate(photos),
    descriptions: generateDate(descriptions),
  };
};

//генерация данных для описания (город, его описание, набор фотографий и подписей к ним)
const generateDescription = () => {
  return {
    description: getRandomArray(descriptions, MAX_SIZE_DESCRIPTION),
    name: generateDate(cities),
    pictures: new Array(getRandomNumber(1, MAX_SIZE_PHOTO)).fill().map(generatePhoto),
  };
};

export const generatePoint = () => {
  const date_from = dayjs().add(getRandomNumber(-20, 20), 'day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  const date_to = dayjs(date_from).add(getRandomNumber(30, 160), 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  return {
    base_price: getRandomNumber(100, 1000),
    date_from,
    date_to,
    description: generateDescription(),
    id: getRandomNumber(0, 10),
    is_favorite: Boolean(getRandomNumber(0, 1)),
    offers: getRandomArray(allOffers),
    type: generateDate(types),
  };
};
