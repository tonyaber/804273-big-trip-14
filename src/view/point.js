import dayjs from 'dayjs';
import { createElement } from '../utils.js';
/**
  * функция считает промежуток во времени
  *
  * @param {date} start - начало промежутка
  * @param {date} second - конец промежутка
  * @returns {string} - возвращает промежуток в формате ${hours}H ${minutes}M
  * если прошло меньше часа, то возвращает ${minutes}M
  */
const calculateDuration = (start, end) => {
  const quantityMinutes = Math.round(end.diff(start) / 60000);

  let hours = Math.floor(quantityMinutes / 60);
  let minutes = (quantityMinutes > 60) ? (quantityMinutes % 60) : quantityMinutes;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours > 0) {
    if (hours < 10) {
      hours = '0' + hours;
    }
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

const createSitePointTemplate = (point) => {
  const { dateFrom, dateTo, basePrice, isFavorite, type, offers, description } = point;

  //определение длины поездки

  const durationTemplate = calculateDuration(dayjs(dateFrom), dayjs(dateTo));

  //создание списка дополнительных опций
  const createOffers = (offer) => {
    return `<li class="event__offer">
              <span class="event__offer-title">${offer.name}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>`;
  };

  const OffersTemplate = offers
    .map((offer) => createOffers(offer))
    .join('');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('D MMM')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${description.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${durationTemplate}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${OffersTemplate}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};
export default class Point {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createSitePointTemplate(this._point);
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

