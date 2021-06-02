import { renderElement } from './utils/render.js';
import { isOnline } from './utils/point.js';
import { toast, toastFixed, deleteToastFixed } from './utils/toast.js';
import TripInfoHeaderView from './view/trip-info-header.js';
import { RenderPosition, UpdateType, OFFLINE} from './const.js';
import HeaderPresenter from './presenter/header.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic fv5k8lmkmm887kpp';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip/';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v14';
const STORE_NAME_FOR_POINT = `${STORE_PREFIX}-${STORE_VER}-POINTS`;
const STORE_NAME_FOR_CITY = `${STORE_PREFIX}-${STORE_VER}-CITY`;
const STORE_NAME_FOR_OFFERS = `${STORE_PREFIX}-${STORE_VER}-OFFERS`;

const siteHeaderElement = document.querySelector('.trip-main');

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME_FOR_POINT, STORE_NAME_FOR_CITY, STORE_NAME_FOR_OFFERS, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const getPoints = apiWithProvider.getPoints();
const getCity = apiWithProvider.getCity();
const getOffers = apiWithProvider.getOffers();

//создаем макет шапки сайта

renderElement(siteHeaderElement, new TripInfoHeaderView(), RenderPosition.AFTERBEGIN);

//находим динамичные элементы для добавления информации
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main__trip-info');

//создаем презентер
const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel, tripPresenter);
const headerPresenter = new HeaderPresenter(siteTripInfoElement, siteNavigationElement, siteEventsElement, pointsModel, tripPresenter, filterPresenter, apiWithProvider);

headerPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  if (!isOnline()) {
    toast('You can\'t create new point offline');
    return;
  }
  tripPresenter.createPoint();
});

tripPresenter.init();

Promise.all([
  getPoints,
  getCity,
  getOffers,
])
  .then((points) => {
    pointsModel.setCity(points[1]);
    pointsModel.setOffers(points[2]);
    pointsModel.setPoints(UpdateType.INIT, points[0]);
  }).catch(() => toast('NO NETWORK! Try again later'));

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  deleteToastFixed();
  document.title = document.title.replace(OFFLINE, '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += OFFLINE;
  toastFixed('NO NETWORK! Try again later');
});

if (!isOnline()) {
  document.title += OFFLINE;
  toastFixed('NO NETWORK! Try again later');
}
