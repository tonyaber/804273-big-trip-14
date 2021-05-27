const POINT_COUNT = 20;

const BAR_HEIGHT = 55;

const NUMBER_OF_SIGNS_FOR_TRIM = 12;

const TimeForFormat = {
  MILLISECOND: 60000,
  DAY: 1440,
  MINUTE: 60,
  STEP: 10,
};

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const FILTERS = ['Everything', 'Future', 'Past'];

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortListChecked = {
  DAY: true,
  TIME: false,
  PRICE: false,
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MenuItem = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

const SortType = {
  TIME: 'sort-time',
  PRICE: 'sort-price',
  DAY: 'sort-day',
};

export { SortType, TYPES, BAR_HEIGHT, CITIES, RenderPosition, TimeForFormat, NUMBER_OF_SIGNS_FOR_TRIM, POINT_COUNT, FILTERS, Mode, SortListChecked, UserAction, UpdateType, FilterType, MenuItem };
