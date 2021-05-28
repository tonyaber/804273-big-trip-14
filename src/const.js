const POINT_COUNT = 20;

const BAR_HEIGHT = 55;

const NUMBER_OF_SIGNS_FOR_TRIM = 12;

const SHAKE_ANIMATION_TIMEOUT = 600;

const TimeForFormat = {
  MILLISECOND: 60000,
  DAY: 1440,
  MINUTE: 60,
  STEP: 10,
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

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

export { SortType, BAR_HEIGHT, SHAKE_ANIMATION_TIMEOUT, State, RenderPosition, TimeForFormat, NUMBER_OF_SIGNS_FOR_TRIM, POINT_COUNT, FILTERS, Mode, SortListChecked, UserAction, UpdateType, FilterType, MenuItem };
