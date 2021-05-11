const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const FILTERS = ['Everything', 'Future', 'Past'];

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const POINT_COUNT = 3;

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
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export { TYPES, CITIES, RenderPosition, POINT_COUNT, FILTERS, Mode, SortListChecked, UserAction, UpdateType, FilterType };
