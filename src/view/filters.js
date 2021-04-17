import AbstractView from './abstract.js';
import { FILTERS } from '../const';

const createFilterTemplate = (filter) => {
  return `<div class="trip-filters__filter">
              <input id="filter-${filter.toLowerCase()}"
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
                value="${filter.toLowerCase()}"
                ${filter === FILTERS[0] ? 'checked' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
            </div>
`;
};
const filterTemplate = FILTERS
  .map((filter) => createFilterTemplate(filter))
  .join('');

const createSiteFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
           ${filterTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class Filters extends AbstractView{
  getTemplate() {
    return createSiteFiltersTemplate();
  }
}
