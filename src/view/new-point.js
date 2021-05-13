import { TYPES } from '../const.js';
import { CITIES, TYPE_WITH_OFFERS, OFFERS} from '../mock/const.js';
import { descriptions } from '../mock/point.js';
import { formatDate, getArrayForType} from '../utils/point.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const BLANK_POINT = {
  basePrice: '',
  dateFrom: dayjs(),
  dateTo: dayjs().add(60, 'minute'),
  type: 'taxi',
  offers: [
    {
      price: 0,
    },
  ],
  description:{
    name: '',
  },
};

const createSiteNewPointTemplate = (point) => {
  const { dateFrom, dateTo, type, offers, basePrice, description} = point;

  //создание разметки для поля type
  const createTypeTemplate = (typeRadio) => {
    return `<div class="event__type-item">
              <input id="event-type-${typeRadio.toLowerCase()}"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="${typeRadio.toLowerCase()}"
                ${(typeRadio === type) ? 'checked' : ''}>
              <label class="event__type-label
                event__type-label--${typeRadio.toLowerCase()}"
                for="event-type-${typeRadio.toLowerCase()}">
                  ${typeRadio}
              </label>
            </div>`;
  };

  const TypeTemplate = TYPES
    .map((type) => createTypeTemplate(type))
    .join('');

  //создание разметки для поля город
  const cityTemplate = CITIES
    .map((city) => `<option value="${city}"></option>`)
    .join('');

  //создание разметки для дополнительных опций
  const offersOfType = getArrayForType(TYPE_WITH_OFFERS, type.toLowerCase());

  const createOfferTemplate = (offer) => {
    let check = '';

    if (offers.some((element) => element.title === offer.title)) {
      check = 'checked';
    }

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden"
                id="event-offer-${offer.name}"
                type="checkbox"
                name="event-offer-${offer.name}"
                ${check}>
              <label class="event__offer-label" for="event-offer-${offer.name}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
              </label>
             </div>`;
  };

  const offersTamplate = () => {
    if (offersOfType === null || offersOfType === undefined || !offersOfType.length) {
      return '';
    }
    const offerTemplate = offersOfType
      .map((offer) => createOfferTemplate(offer))
      .join('');

    return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offerTemplate}
                    </div>
                  </section>`;
  };

  const createPhotoTemplate = (photo) => {
    return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
  };

  const createDescriptionTemplate = (description) => {
    return `${description}`;
  };

  const descriptionsTemplate = () => {
    if (description === null || description === undefined || description.name === '') {
      return '';
    }

    const photoTemplate = descriptions.find((element) => element.name === description.name).pictures
      .map((photo) => createPhotoTemplate(photo))
      .join('');

    const descriptionTemplate = descriptions.find((element) => element.name === description.name).description
      .map((description) => createDescriptionTemplate(description))
      .join(' ');

    return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${descriptionTemplate}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoTemplate}
                      </div>
                    </div>
                    </section>`;
  };

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${TypeTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                       ${type}
                    </label>
                    <input class="event__input  event__input--destination"
                      id="event-destination}" type="text"
                      name="event-destination"
                      value="${description.name}"
                      list="destination-list-1">
                    <datalist id="destination-list">
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
                    <label class="event__label" for="event-price">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price" type="number" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${offersTamplate()}
                  ${descriptionsTemplate()}
                </section>
              </form>
            </li>`;
};

export default class NewPoint extends SmartView{
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;
    this._datepickerFrom = null;
    this._datepickerTo = null;
    this._point.offers = [];

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._cityClickHandler = this._cityClickHandler.bind(this);
    this._priceClickHandler = this._priceClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._offerClickHandler = this._offerClickHandler.bind(this);

    this._dueDateFromChangeHandler = this._dueDateFromChangeHandler.bind(this);
    this._dueDateToChangeHandler = this._dueDateToChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createSiteNewPointTemplate(this._point);
  }

  reset(point) {
    this.updateData(
      point,
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  removeElement() {
    super.removeElement();
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
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceClickHandler);
    this.getElement()
      .querySelector('.event__available-offers')
      .addEventListener('change', this._offerClickHandler);
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
          defaultDate: dayjs(this._point.dateFrom).format('DD/MM/YYYY HH:mm'),
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
          defaultDate: dayjs(this._point.dateTo).format('DD/MM/YYYY HH:mm'),
          onClose: this._dueDateToChangeHandler,
        },
      );
    }
  }

  _validityFormForCity(evt) {
    CITIES.some((city) => city === evt.target.value) ?
      evt.target.setCustomValidity('') :
      evt.target.setCustomValidity('Выберите город из доступного списка');
  }

  _validityFormForDate() {
    dayjs(this._point.dateTo).diff(dayjs(this._point.dateFrom)) < 0 ?
      this.getElement().querySelector('#event-start-time').setCustomValidity('Измените время. Начало поездки не может быть позже окончания') :
      this.getElement().querySelector('#event-start-time').setCustomValidity('');
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

  _cityClickHandler(evt) {
    if (evt.target.value && descriptions.find((element) => element.name === evt.target.value)) {
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

  _priceClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    });
  }

  _offerClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.checked) {
      this._point.offers.push(OFFERS[evt.target.name.substr(12)]);
    }
    else {
      this._index = this._point.offers.findIndex((point) => point.name === OFFERS[evt.target.name.substr(12)].name);
      this._point.offers = [
        ...this._point.offers.slice(0, this._index),
        ...this._point.offers.slice(this._index + 1),
      ];
    }
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._point);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
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
