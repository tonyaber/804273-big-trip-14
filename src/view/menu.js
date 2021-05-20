import AbstractView from './abstract.js';
import { MenuItem } from '../const.js';

const createSiteMenuTemplate = (check) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn ${MenuItem.TABLE === check ? 'trip-tabs__btn--active' : ''} " href="#" id="${MenuItem.TABLE}">Table</a>
            <a class="trip-tabs__btn ${MenuItem.STATS === check ? 'trip-tabs__btn--active' : ''} " id="${MenuItem.STATS}" href="#">Stats</a>
          </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._checkedElement = MenuItem.TABLE;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._checkedElement);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._checkedElement = evt.target.id;
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
