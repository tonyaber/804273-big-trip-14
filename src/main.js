import { renderElement } from './utils/render.js';
import TripInfoHeaderView from './view/trip-info-header.js';
import { generatePoint } from './mock/point.js';
import { RenderPosition, POINT_COUNT } from './const.js';
import HeaderPresenter from './presenter/header.js';
import PointsModel from './model/point.js';
//import FilterView from './view/filters.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
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
const headerPresenter = new HeaderPresenter(siteTripInfoElement, siteFiltersElement, siteNavigationElement, pointsModel);
headerPresenter.init();

const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel);


const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel);
filterPresenter.init();
//const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel, pointsModel);

//filterPresenter.init();
tripPresenter.init();

