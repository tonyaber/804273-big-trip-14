import { renderElement } from './utils/render.js';
import TripInfoHeaderView from './view/trip-info-header.js';
import { generatePoint } from './mock/point.js';
import { RenderPosition, POINT_COUNT } from './const.js';
import TripPresenter from './presenter/trip.js';

const points = new Array(POINT_COUNT).fill().map(generatePoint);

//создаем макет шапки сайта
const siteHeaderElement = document.querySelector('.trip-main');
renderElement(siteHeaderElement, new TripInfoHeaderView(), RenderPosition.AFTERBEGIN);

//находим динамичные элементы для добавления информации
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main__trip-info');

//создаем презентер
const tripPresenter = new TripPresenter(siteEventsElement, siteTripInfoElement, siteFiltersElement, siteNavigationElement);
tripPresenter.init(points);
