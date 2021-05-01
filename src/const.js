const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const FILTERS = ['Everything', 'Future', 'Past'];

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const POINT_COUNT = 20;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortListChecked = {
  DAY: 'checked',
  TIME: '',
  PRICE: '',
};
export { TYPES, CITIES, RenderPosition, POINT_COUNT, FILTERS, Mode, SortListChecked };
