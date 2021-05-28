import AbstractView from './abstract.js';

const createSiteTripInfoHeaderTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class TripInfoHeader extends AbstractView {
  getTemplate() {
    return createSiteTripInfoHeaderTemplate(this._points);
  }
}
