import Observer from '../utils/observer.js';

export default class Point extends Observer {
  constructor() {
    super();
    this._points = [];
    this._city = [];
    this._offers = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  setCity(city) {
    this._city = city.slice();
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getPoints() {
    return this._points;
  }

  getCity() {
    return this._city;
  }

  getOffers() {
    return this._offers;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        basePrice: point.base_price,
        dateFrom: point.date_from !== null ? new Date(point.date_from) : new Date(),
        dateTo: point.date_to !== null ? new Date(point.date_to) : new Date(),
        isFavorite: point.is_favorite,
        description: point.destination,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.destination;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': Number(point.basePrice),
        'date_from': point.dateFrom ,
        'date_to': point.dateTo ,
        'is_favorite': point.isFavorite,
        destination: point.description,
      },
    );
    // Ненужные ключи мы удаляем
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.description;

    return adaptedPoint;
  }
}
