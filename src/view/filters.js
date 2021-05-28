import AbstractView from './abstract.js';

const ZERO_OF_POINTS = 0;

const createFilterTemplate = (filter, currentFilterType) => {
  const { type, count } = filter;

  return `<div class="trip-filters__filter">
              <input id="filter-${type}"
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
                ${type === currentFilterType ? 'checked' : ''}
                value="${type}"
                ${count === ZERO_OF_POINTS ? 'disabled' : ''}>
              <label class="trip-filters__filter-label" for="filter-${type}">${type}(${count})</label>
            </div>`;
};

const createSiteFiltersTemplate = (filterItems, currentFilterType) => {

  const filterTemplate = filterItems
    .map((filter) => createFilterTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
           ${filterTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }


  getTemplate() {
    return createSiteFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
