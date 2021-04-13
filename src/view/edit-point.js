import dayjs from 'dayjs';
import { TYPES, CITIES, ALL_OFFERS, OFFERS_CLASS_NAME } from '../const.js';
import { createElement } from '../utils.js';

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
  const createOfferTemplate = (offer,index) => {
    let check = '';

    if (offers.some((element) => element.name == offer.name)) {
      check = 'checked';
    }

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden"
                id="event-offer-${OFFERS_CLASS_NAME[index]}-${id}"
                type="checkbox"
                name="event-offer-${OFFERS_CLASS_NAME[index]}"
                ${check}>
              <label class="event__offer-label" for="event-offer-${OFFERS_CLASS_NAME[index]}-${id}">
              <span class="event__offer-title">${offer.name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
              </label>
             </div>`;
  };

  const offerTemplate = ALL_OFFERS
    .map((offer,index) => createOfferTemplate(offer,index))
    .join('');

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
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input
                      event__input--time"
                      id="event-start-time-1"
                      type="text"
                      name="event-start-time"
                      value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time"
                      id="event-end-time-1"
                      type="text"
                      name="event-end-time"
                      value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
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
                    <p class="event__destination-description">${description.description}</p>
                  </section>
                </section>
              </form>
            </li>`;
};
export default class EditPoint {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createSiteEditPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
