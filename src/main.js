import { renderElement} from './utils/render.js';
import TripInfoHeaderView from './view/trip-info-header.js';
import { RenderPosition,  UpdateType } from './const.js';
import HeaderPresenter from './presenter/header.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic fvfvf5451v7f5v4h';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip/';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

//создаем макет шапки сайта
const siteHeaderElement = document.querySelector('.trip-main');
renderElement(siteHeaderElement, new TripInfoHeaderView(), RenderPosition.AFTERBEGIN);

//находим динамичные элементы для добавления информации
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main__trip-info');

//создаем презентер
const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel, tripPresenter);
const headerPresenter = new HeaderPresenter(siteTripInfoElement, siteFiltersElement, siteNavigationElement, siteEventsElement, pointsModel, tripPresenter, filterPresenter, api);

headerPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

tripPresenter.init();

const getPoints = api.getPoints();
const getCity = api.getCity();
const getOffers = api.getOffers();
Promise.all([
  getPoints,
  getCity,
  getOffers,
])
  .then((points) => {
    pointsModel.setCity(points[1]);
    pointsModel.setOffers(points[2]);
    pointsModel.setPoints(UpdateType.INIT, points[0]);
  })
  .catch(() => pointsModel.setPoints(UpdateType.INIT, []));
