import { getRandomNumber, getRandomArray } from '../utils.js';
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

const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const cities = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

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

const offers = [
  {
    name: 'Add luggage',
    price: 30,
    id: 0,
  },
  {
    name: 'Switch to comfort class',
    price: 100,
    id: 1,
  },
  {
    name: 'Add meal',
    price: 15,
    id: 2,
  },
  {
    name: 'Choose seats',
    price: 5,
    id: 3,
  },
  {
    name: 'Travel by train',
    price: 40,
    id: 4,
  },
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
  const duration = getRandomNumber(30, 160);
  return {
    base_price: getRandomNumber(0, 1000),
    date_from: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
    duration,
    date_to: dayjs().add(duration, 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
    description: generateDescription(),
    id: getRandomNumber(0,10),
    is_favorite: Boolean(getRandomNumber(0, 1)),
    offers: getRandomArray(offers),
    type: generateDate(types),
  };
};
