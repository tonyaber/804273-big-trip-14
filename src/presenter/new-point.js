import PointNewView from '../view/new-point';
import { remove, renderElement } from '../utils/render.js';
import { UserAction, UpdateType, RenderPosition } from '../const.js';

export default class PointNew {
  constructor(pointListContainer, changeData, cities, offers) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._cities = cities;
    this._offers = offers;

    this._pointNewComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownClickHandler = this._escKeyDownClickHandler.bind(this);
  }

  init() {
    if (this._pointNewComponent !== null) {
      return;
    }

    this._pointNewComponent = new PointNewView(this._cities, this._offers);

    this._pointNewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointNewComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._pointListContainer, this._pointNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownClickHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = true;
  }

  setSaving() {
    this._pointNewComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointNewComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointNewComponent.shake(resetFormState);
  }

  destroy() {
    if (this._pointNewComponent === null) {
      return;
    }

    remove(this._pointNewComponent);
    this._pointNewComponent = null;

    document.removeEventListener('keydown', this._escKeyDownClickHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownClickHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
