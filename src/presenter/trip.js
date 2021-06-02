import { renderElement, remove } from '../utils/render.js';
import { sortDay, sortTime, sortPrice } from '../utils/sort.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import LoadingView from '../view/loading.js';
import EmptyListView from '../view/empty-list.js';
import PointPresenter from './point.js';
import PointNewPresenter from './new-point.js';
import { filterPoint } from '../utils/filter.js';
import { RenderPosition, UpdateType, UserAction, FilterType, SortType, State as PointPresenterViewState } from '../const.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, api) {
    this._tripContainer = tripContainer;

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._loadingComponent = new LoadingView();

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._sortComponent = null;
    this._isLoading = true;

    this._points = [];
    this._cities = [];
    this._offers = [];
    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction, this._cities, this._offers);

    this._currentSortType = SortType.DAY;
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderList();
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderTrip();
  }

  destroy() {
    this._clearPoint({ resetRenderedPointCount: true, resetSortType: true });

    remove(this._listComponent);
    remove(this._emptyListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);

    this.clearSort();
  }

  renderSortDefault() {
    if (this._points.length) {
      this.clearSort();
      this._currentSortType = SortType.DAY;
      this._renderSort();
    }
  }

  createPoint() {
    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction, this._cities, this._offers);
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.renderSortDefault();
    this._pointNewPresenter.init();
  }

  clearSort() {
    remove(this._sortComponent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    this._points = this._pointsModel.getPoints();
    const filtredPoints = filterPoint[filterType](this._points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPrice);
    }
    return filtredPoints.sort(sortDay);
  }

  _getCity() {
    return this._pointsModel.getCity();
  }

  _getOffers() {
    return this._pointsModel.getOffers();
  }

  _renderList() {
    renderElement(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point, cities, offers) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleViewAction, this._handleModeChange, cities, offers);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points, cities, offers) {
    points.forEach((point) => this._renderPoint(point, cities, offers));
  }

  _renderEmptyList() {
    renderElement(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _clearPoint() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    remove(this._loadingComponent);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._points = this._getPoints();
    this._cities = this._getCity();
    this._offers = this._getOffers();

    if (!this._points.length) {
      this._renderEmptyList();
      return;
    }

    this.clearSort();
    this._renderSort();
    this._renderPoints(this._points, this._cities, this._offers);
    remove(this._emptyListComponent);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    renderElement(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.FAVORITE:
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          });
        break;
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setViewState(PointPresenterViewState.SAVING);
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
            this._pointNewPresenter.destroy();
          })
          .catch(() => {
            this._pointNewPresenter.setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, point) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[point.id].init(point);
        break;
      case UpdateType.MAJOR:
        this._clearPoint();
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPoint();
    this._renderTrip();
  }
}
