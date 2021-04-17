import AbstractView from './abstract.js';

const createSiteListTemplate = () => {
  return `<ul class="trip-events__list">
          </ul>`;
};

export default class List extends AbstractView {
  getTemplate() {
    return createSiteListTemplate();
  }
}

