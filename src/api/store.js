export default class Store {
  constructor(point, city, offers, storage) {
    this._storage = storage;
    this._storeKeyPoint = point;
    this._storeKeyCity = city;
    this._storeKeyOffers = offers;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKeyPoint));
    } catch (err) {
      return {};
    }
  }

  getCity() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKeyCity)) || {};
    } catch (err) {
      return {};
    }
  }

  getOffers() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKeyOffers)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
      this._storeKeyPoint,
      JSON.stringify(items),
    );
  }

  setCity(items) {
    this._storage.setItem(
      this._storeKeyCity,
      JSON.stringify(items),
    );
  }

  setOffers(items) {
    this._storage.setItem(
      this._storeKeyOffers,
      JSON.stringify(items),
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKeyPoint,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value,
        }),
      ),
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKeyPoint,
      JSON.stringify(store),
    );

  }
}
