import { renderElement, updateItem } from '../utils/render.js';
import TripInfoView from '../view/trip-info.js';
import NavigationView from '../view/menu.js';
import PriceView from '../view/price.js';
import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/empty-list.js';
import PointPresenter from './point.js';
import { RenderPosition} from '../const.js';

export default class Trip {
  constructor(tripContainer, tripInfoContainer, tripFilterContainer, siteNavigationContainer) {
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripNavigationContainer = siteNavigationContainer;

    this._listComponent = new ListView();
    this._navigationComponent = new NavigationView();
    this._filterComponent = new FiltersView();
    this._sortComponent = new SortView();
    this._emptyListComponent = new EmptyListView();

    this._pointPresenter = {};
    this._handlePointFavorite = this._handlePointFavorite.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._renderList();
    this._renderTrip();
  }

  _renderList() {
    renderElement(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    renderElement(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.BEFOREEND);
  }

  _renderPrice() {
    renderElement(this._tripInfoContainer, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _renderNavigation() {
    renderElement(this._tripNavigationContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    renderElement(this._tripFilterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._tripContainer,this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _handlePointFavorite(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointFavorite, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._points.slice().forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    renderElement(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTrip() {
    if (!this._points.length) {
      this._renderEmptyList();
      return;
    }
    this._tripInfoComponent = new TripInfoView(this._points);
    this._priceComponent = new PriceView(this._points);
    this._renderTripInfo();
    this._renderPrice();
    this._renderNavigation();
    this._renderFilters();
    this._renderSort();
    this._renderPoints();
  }
}
