import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import { RenderPosition, Mode } from '../const.js';
import { replace, remove, renderElement } from '../utils/render.js';
import { UserAction, UpdateType, State } from '../const.js';
import { isOnline } from '../utils/point.js';
import { toast } from '../utils/toast.js';

export default class Point {
  constructor(tripContainer, changeData, changeMode, cities, offers) {
    this._tripContainer = tripContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._cities = cities;
    this._offers = offers;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._prevPointComponent = null;
    this._prevPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownClickHandler = this._escKeyDownClickHandler.bind(this);
    this._handleUneditClick = this._handleUneditClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._blockForm = this._blockForm.bind(this);
    this._unBlockForm = this._unBlockForm.bind(this);
  }

  init(point) {
    this._point = point;

    this._prevPointComponent = this._pointComponent;
    this._prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new EditPointView(this._point, this._cities, this._offers);

    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setEditClickHandler(this._handleUneditClick);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (this._prevPointComponent === null || this._prevPointEditComponent === null) {
      renderElement(this._tripContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, this._prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, this._prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(this._prevPointComponent);
    remove(this._prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._pointEditComponent.reset(this._point);
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _deleteEventListener() {
    window.removeEventListener('offline', this._blockForm);
    window.removeEventListener('online', this._unBlockForm);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownClickHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownClickHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.FAVORITE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _blockForm() {
    this._pointEditComponent.shake(() => {
      this._pointEditComponent.updateData({
        isDisabled: true,
      });
    });
  }

  _unBlockForm() {
    this._pointEditComponent.updateData({
      isDisabled: false,
    });
  }

  _handleEditClick() {
    if (!isOnline()) {
      toast('You can\'t edit point offline');
      return;
    }
    window.addEventListener('offline', this._blockForm);
    window.addEventListener('online', this._unBlockForm);

    this._replaceCardToForm();
  }

  _handleUneditClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToCard();
    this._deleteEventListener();
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MAJOR,
      point,
    );
    this._deleteEventListener();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point,
    );
    this._deleteEventListener();
  }

  _escKeyDownClickHandler(evt) {
    if (evt.key === 'Escape' && evt.target.type !== 'text' && evt.target.type !== 'number') {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToCard();
      this._deleteEventListener();
    }
  }
}
