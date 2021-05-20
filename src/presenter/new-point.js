import PointNewView from '../view/new-point';
import { nanoid } from 'nanoid';
import { remove, renderElement } from '../utils/render.js';
import { UserAction, UpdateType, RenderPosition } from '../const.js';

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointNewComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointNewComponent !== null) {
      return;
    }

    this._pointNewComponent = new PointNewView();

    this._pointNewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointNewComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._pointListContainer, this._pointNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = true;
  }


  destroy() {
    if (this._pointNewComponent === null) {
      return;
    }

    remove(this._pointNewComponent);
    this._pointNewComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      Object.assign({ id: nanoid() }, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
