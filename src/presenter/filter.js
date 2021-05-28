import FilterView from '../view/filters.js';
import { renderElement, replace, remove } from '../utils/render.js';
import { filterPoint } from '../utils/filter.js';
import { FilterType, UpdateType, RenderPosition } from '../const.js';

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel, tripPresenter) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._tripPresenter = tripPresenter;

    this._filterComponent = null;
    this._filtersComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      this._filtersComponent = document.querySelectorAll('.trip-filters__filter-input');
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
    this._filtersComponent = document.querySelectorAll('.trip-filters__filter-input');
  }

  blockFilters() {
    this._filtersComponent.forEach((filter) => filter.disabled = true);
  }

  unblockFilters() {
    this._filtersComponent.forEach((filter) => filter.disabled = false);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    this._tripPresenter.renderSortDefault();
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        count: filterPoint[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        count: filterPoint[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        count: filterPoint[FilterType.PAST](points).length,
      },
    ];
  }
}
