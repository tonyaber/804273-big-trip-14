import dayjs from 'dayjs';

export const createSitePointTemplate = (point) => {
  const { base_price, date_from, date_to, is_favorite, type, offers, description } = point;

  //определение длины поездки
  const date1 = dayjs(date_from);
  const date2 = dayjs(date_to);
  let duration = Math.round(date2.diff(date1) / 60000);
  let hours = 0;

  while (duration > 60) {
    hours = hours + 1;
    duration = duration - 60;
  }

  let minutes = duration;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  let durationTemplate = '';

  if (hours != 0) {
    if (hours < 10) {
      hours = '0' + hours;
    }
    durationTemplate = `${hours}H ${minutes}M`;
  }
  else {
    durationTemplate = `${minutes}M`;
  }

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

  //проверяем, в избранном ли поездка
  let isFavoriteTemplate = 'event__favorite-btn';

  if (is_favorite) {
    isFavoriteTemplate = 'event__favorite-btn event__favorite-btn--active';
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dayjs(date_from).format('YYYY-MM-DD')}">${dayjs(date_from).format('D MMM')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${description.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dayjs(date_from).format('YYYY-MM-DDTHH:mm')}">${dayjs(date_from).format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dayjs(date_to).format('YYYY-MM-DDTHH:mm')}">${dayjs(date_to).format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${durationTemplate}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${base_price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${OffersTemplate}
                </ul>
                <button class="${isFavoriteTemplate}" type="button">
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
