import { TYPES, CITIES, ALL_OFFERS } from '../const.js';
import { DESCRIOTION } from '../mock/point.js';
import { formatDate } from '../utils/point.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createSiteEditPointTemplate = (point) => {
  const { dateFrom, dateTo, basePrice, type, offers, description, id } = point;

  //создание разметки для поля type
  const createTypeTemplate = (typeRadio) => {
    return `<div class="event__type-item">
              <input id="event-type-${typeRadio.toLowerCase()}-${id}"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="${typeRadio.toLowerCase()}"
                ${(typeRadio === type) ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${typeRadio.toLowerCase()}"
                for="event-type-${typeRadio.toLowerCase()}-${id}">
                ${typeRadio}
              </label>
            </div>`;
  };

  const typeTemplate = TYPES
    .map((type) => createTypeTemplate(type))
    .join('');

  //создание разметки для поля город
  const cityTemplate = CITIES
    .map((city) => `<option value="${city}"></option>`)
    .join('');

  //создание разметки для дополнительных опций
  const offersOfType = ALL_OFFERS.find((element) => element.type === type.toLowerCase()).offers;

  const createOfferTemplate = (offer, index) => {
    let check = '';

    if (offers.some((element) => element.title === offer.title)) {
      check = 'checked';
    }

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden"
                id="event-offer-${index}-${id}"
                type="checkbox"
                name="event-offer-${index}"
                ${check}>
              <label class="event__offer-label" for="event-offer-${index}-${id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
              </label>
             </div>`;
  };

  const offerTemplate = offersOfType
    .map((offer, index) => createOfferTemplate(offer, index))
    .join('');

  //создание разметки для фото
  const createPhotoTemplate = (photo) => {
    return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
  };

  const photoTemplate = DESCRIOTION.find((element) => element.name === description.name).pictures
    .map((photo) => createPhotoTemplate(photo))
    .join('');

  const createDescriptionTemplate = (description) => {
    return `${description}`;
  };

  const descriptionTemplate = DESCRIOTION.find((element) => element.name === description.name).description
    .map((description) => createDescriptionTemplate(description))
    .join(' ');

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${typeTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                       ${type}
                    </label>
                    <input class="event__input  event__input--destination"
                      id="event-destination-1"
                      type="text"
                      name="event-destination"
                      value="${description.name}"
                      list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${cityTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time">From</label>
                    <input class="event__input
                      event__input--time"
                      id="event-start-time"
                      type="text"
                      name="event-start-time"
                      value="${formatDate(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time">To</label>
                    <input class="event__input  event__input--time"
                      id="event-end-time"
                      type="text"
                      name="event-end-time"
                      value="${formatDate(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offerTemplate}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${descriptionTemplate}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoTemplate}
                      </div>
                    </div>
                    </section>
                </section>
              </form>
            </li>`;
};

export default class EditPoint extends SmartView {
  constructor(point) {
    super();
    this._point = point;
    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._cityClickHandler = this._cityClickHandler.bind(this);

    this._dueDateFromChangeHandler = this._dueDateFromChangeHandler.bind(this);
    this._dueDateToChangeHandler = this._dueDateToChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createSiteEditPointTemplate(this._point);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  }

  _setInnerHandlers() {
    this._setDatepickerFrom();
    this._setDatepickerTo();
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeClickHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityClickHandler);
  }

  _validityFormForCity(evt) {
    CITIES.some((element) => element === evt.target.value) ?
      evt.target.setCustomValidity('') :
      evt.target.setCustomValidity('Выберите город из доступного списка');
  }

  _validityFormForDate() {
    dayjs(this._point.dateTo).diff(dayjs(this._point.dateFrom)) < 0 ?
      this.getElement().querySelector('#event-end-time').setCustomValidity('Измените время. Начало поездки не может быть позже окончания') :
      this.getElement().querySelector('#event-end-time').setCustomValidity('');
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(this._point);
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _setDatepickerFrom() {
    this._validityFormForDate();
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
      return;
    }
    if (this._point.dateFrom) {
      this._datepickerFrom = flatpickr(
        this.getElement().querySelector('#event-start-time'),
        {
          dateFormat: 'd/m/Y H:i',
          enableTime: true,
          allowInput: true,
          defaultDate: [''],
          onClose: this._dueDateFromChangeHandler,
        },
      );
    }
  }

  _setDatepickerTo() {
    this._validityFormForDate();
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
      return;
    }
    if (this._point.dateTo) {
      this._datepickerTo = flatpickr(
        this.getElement().querySelector('#event-end-time'),
        {
          dateFormat: 'd/m/Y H:i',
          enableTime: true,
          allowInput: true,
          defaultDate: [''],
          onClose: this._dueDateToChangeHandler,
        },
      );
    }
  }

  _dueDateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: dayjs(userDate),
    });
  }

  _dueDateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: dayjs(userDate),
    });
  }

  _cityClickHandler(evt) {
    if (evt.target.value && DESCRIOTION.find((element) => element.name === evt.target.value)) {
      evt.preventDefault();
      this.updateData({
        description: Object.assign(
          {},
          this._point.description,
          { name: evt.target.value },
        ),
      });
    }
    else {
      this._validityFormForCity(evt);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
