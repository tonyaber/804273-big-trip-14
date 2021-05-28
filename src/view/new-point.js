import { NUMBER_OF_SIGNS_FOR_TRIM } from '../const.js';
import { formatDate, getArrayForType} from '../utils/point.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const BLANK_POINT = {
  basePrice: '100',
  dateFrom: dayjs(),
  dateTo: dayjs().add(60, 'minute'),
  type: 'taxi',
  description:{
    name: 'Chamonix',
    description: 'Chamonix, in a middle of Europe, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        description: 'Chamonix parliament building',
        src: 'http://picsum.photos/300/200?r=0.8973497000725617',
      },
    ],
  },
  isFavorite: false,
};

const createSiteNewPointTemplate = (city, offers, point) => {
  const { dateFrom, dateTo, type, basePrice, description, isDisabled, isSaving} = point;
  //создание разметки для поля type
  const createTypeTemplate = (typeRadio) => {
    return `<div class="event__type-item">
              <input id="event-type-${typeRadio}"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="${typeRadio}"
                ${(typeRadio === type) ? 'checked' : ''}>
              <label class="event__type-label
                event__type-label--${typeRadio}"
                for="event-type-${typeRadio}">
                  ${typeRadio[0].toUpperCase() + typeRadio.slice(1)}
              </label>
            </div>`;
  };

  const TypeTemplate = offers
    .map((offer) => offer.type)
    .map((type) => createTypeTemplate(type))
    .join('');

  //создание разметки для поля город
  const cityTemplate = city
    .map((city) => city.name)
    .map((city) => `<option value="${city}"></option>`)
    .join('');

  //создание разметки для дополнительных опций
  const offersOfType = getArrayForType(offers, type);

  const createOfferTemplate = (offer, index, isDisabled) => {
    let check = '';

    if (point.offers.some((element) => element.title === offer.title)) {
      check = 'checked';
    }

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden"
                id="event-offer-${index}"
                type="checkbox"
                name="event-offer-${offer.title}"
                ${check}
                ${isDisabled ? 'disabled' : ''}>
              <label class="event__offer-label" for="event-offer-${index}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
              </label>
             </div>`;
  };

  const offersTamplate = () => {
    if (!offersOfType.offers.length) {
      return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
              </div>
        </section>`;
    }

    const offerTemplate = offersOfType.offers
      .map((offer, index) => createOfferTemplate(offer, index, isDisabled))
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

  const descriptionsTemplate = () => {
    const photoTemplate = city.find((element) => element.name === description.name).pictures
      .map((photo) => createPhotoTemplate(photo))
      .join('');

    const descriptionTemplate = city.find((element) => element.name === description.name).description;

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
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
                      id="event-destination" type="text"
                      name="event-destination"
                      value="${description.name}"
                      list="destination-list"
                      ${isDisabled ? 'disabled' : ''}>
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
                      value="${formatDate(dateFrom)}"
                      ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time">To</label>
                    <input class="event__input  event__input--time"
                      id="event-end-time"
                      type="text"
                      name="event-end-time"
                      value="${formatDate(dateTo)}"
                      ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price"
                      id="event-price"
                      type="number"
                      name="event-price"
                      value="${basePrice}"
                      ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
                     ${isSaving ? 'Saving...' : 'Save'}
                   </button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
                    Cancel
                  </button>
                </header>
                <section class="event__details">
                  ${offersTamplate()}
                  ${descriptionsTemplate()}
                </section>
              </form>
            </li>`;
};

export default class NewPoint extends SmartView{
  constructor(city, offers, point = BLANK_POINT) {
    super();
    this._point = point;
    this._city = city;
    this._offers = [];
    this._offersAll = offers;
    this._offersOfPoint = getArrayForType(this._offersAll, this._point.type).offers;

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
    return createSiteNewPointTemplate(this._city, this._offersAll, this._point);
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
    this._city.map((city) => city.name).some((city) => city === evt.target.value) ?
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
    this.updateData(
      {
        offers: [],
      },
    ),
    this.updateData({
      type: evt.target.value,
    });
    this._offers = [];
    this._offersOfPoint = getArrayForType(this._offersAll, this._point.type).offers;
  }

  _cityClickHandler(evt) {
    if (evt.target.value && this._city.find((element) => element.name === evt.target.value)) {
      evt.preventDefault();
      this.updateData({
        description: Object.assign(
          {},
          this._point.description,
          {
            name: evt.target.value,
            description: this._city.find((city)=>city.name===evt.target.value).description,
            pictures: this._city.find((city) => city.name === evt.target.value).pictures,
          },
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
      this._offers.push(this._offersOfPoint.find((offer) => offer.title === evt.target.name.substr(NUMBER_OF_SIGNS_FOR_TRIM)));
      this.updateData(Object.assign(
        {},
        this._point,
        { offers: this._offers },
      ));
    }
    else {
      this._index = this._offers.findIndex((point) => point.title === evt.target.name.substr(NUMBER_OF_SIGNS_FOR_TRIM));
      this._offers = [
        ...this._offers.slice(0, this._index),
        ...this._offers.slice(this._index + 1),
      ];
      this.updateData(Object.assign(
        {},
        this._point,
        { offers: this._offers },
      ));
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
