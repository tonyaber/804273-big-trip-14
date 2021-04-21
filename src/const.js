const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const OFFERS_CLASS_NAME = ['luggage', 'comfort', 'meal', 'seats', 'train'];

const FILTERS = ['Everything', 'Future', 'Past'];

const ALL_OFFERS = [
  {
    name: 'Add luggage',
    price: 30,
  },
  {
    name: 'Switch to comfort class',
    price: 100,
  },
  {
    name: 'Add meal',
    price: 15,
  },
  {
    name: 'Choose seats',
    price: 5,
  },
  {
    name: 'Travel by train',
    price: 40,
  },
];

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const POINT_COUNT = 20;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export { TYPES, CITIES, OFFERS_CLASS_NAME, ALL_OFFERS, RenderPosition, POINT_COUNT, FILTERS, Mode, SortType };
