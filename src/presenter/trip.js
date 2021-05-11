import { renderElement, remove } from '../utils/render.js';
import { sortDay, sortTime, sortPrice } from '../utils/sort.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/empty-list.js';
import PointPresenter from './point.js';
import { filterPoint } from '../utils/filter.js';
import { RenderPosition, UpdateType, UserAction } from '../const.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel) {
    this._tripContainer = tripContainer;

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();

    this._pointPresenter = {};
    this._currentSortType = 'sort-day';
    this._sortComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderList();
    this._renderTrip();
  }
  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filterPoint[filterType](points);

    switch (this._currentSortType) {
      case 'sort-time':
        return filtredPoints.sort(sortTime);
      case 'sort-price':
        return filtredPoints.sort(sortPrice);
    }
    return filtredPoints.sort(sortDay);
  }
  _sortPointsDefault() {
    return this._pointsModel.getPoints().slice().sort(sortDay);
  }

  _renderList() {
    renderElement(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    renderElement(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _clearPoint() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearSort() {
    remove(this._sortComponent);
  }

  _renderTrip() {
    const points = this._getPoints();
    if (!points.length) {
      this._renderEmptyList();
      return;
    }
    if (this._sortComponent === null) {
      this._renderSort();
      this._sortPointsDefault();
      this._renderPoints(points);
      return;
    }
    this._renderPoints(points);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
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
    }
  }

  _handleModeChange() {
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
