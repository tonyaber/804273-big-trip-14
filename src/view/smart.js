import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._point = {};
  }

  updateData(update) {
    if (!update) {
      return;
    }
    //!!Ошибка. Должно быть this._data, но так не работает, this._data не меняет this._point
    this._point = Object.assign(
      {},
      this._point,
      update,
    );
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
