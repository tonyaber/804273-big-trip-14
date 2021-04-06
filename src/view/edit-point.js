import dayjs from 'dayjs';
import { TYPES, cities, allOffers, offersClassName } from '../const.js';

export const createSiteEditPointTemplate = (point) => {
  const { base_price, type, offers, description } = point;
  const dateFrom = dayjs(point.date_from);
  const dateTo = dayjs(point.date_to);

  //создание разметки для поля type
  const createTypeTemplate = (typeRadio,index) => {
    return `<div class="event__type-item">
              <input id="event-type-${typeRadio.toLowerCase()}-1${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeRadio.toLowerCase()}" ${(typeRadio === type) ? 'checked':''}>
              <label class="event__type-label  event__type-label--${typeRadio.toLowerCase()}" for="event-type-${typeRadio.toLowerCase()}-1${index}">${typeRadio}</label>
            </div>`;
  };

  const typeTemplate = TYPES
    .map((type, index) => createTypeTemplate(type,index))
    .join('');

  //создание разметки для поля город
  const cityTemplate = cities
    .map((city) => `<option value="${city}"></option>`)
    .join('');

  //создание разметки для дополнительных опций
  const createOfferTemplate = (offer,index) => {
    let check = '';

    if (offers.some((element) => element.name == offer.name)) {
      check = 'checked';
    }

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offersClassName[index]}-2" type="checkbox" name="event-offer-${offersClassName[index]}" ${check}>
              <label class="event__offer-label" for="event-offer-${offersClassName[index]}-2">
              <span class="event__offer-title">${offer.name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
              </label>
             </div>`;
  };

  const offerTemplate = allOffers
    .map((offer,index) => createOfferTemplate(offer,index))
    .join('');

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${description.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${cityTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('DD/MM/YY HH:mm')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('DD/MM/YY HH:mm')}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${base_price}">
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
