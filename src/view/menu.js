import AbstractView from './abstract.js';

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn" href="#">Table</a>
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
          </nav>`;
};

export default class Menu extends AbstractView {
  getTemplate() {
    return createSiteMenuTemplate();
  }

}
