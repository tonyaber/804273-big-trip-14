import PointsModel from '../model/point.js';
import { isOnline } from '../utils/point.js';

const getSyncedPoints = (items) => {
  return items.filter(({ success }) => success)
    .map(({ payload }) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createStoreStructureForCity = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.name]: current,
    });
  }, {});
};

const createStoreStructureForOffers = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.type]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  getCity() {
    if (isOnline()){
      return this._api.getCity()
        .then((city) => {
          const items = createStoreStructureForCity(city);
          this._store.setCity(items);
          return city;
        });
    }

    const storeCity = Object.values(this._store.getCity());

    return Promise.resolve(storeCity);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructureForOffers(offers);
          this._store.setOffers(items);
          return offers;
        });
    }
    const storeOffers = Object.values(this._store.getOffers());
    return Promise.resolve(storeOffers);
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    return Promise.reject(new Error('update point failed'));
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
