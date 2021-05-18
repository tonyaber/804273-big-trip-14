import { renderElement, remove, showClass, hideClass} from './utils/render.js';
import TripInfoHeaderView from './view/trip-info-header.js';
import SiteMenuView from './view/menu.js';
import StatisticsView from './view/stats.js';
import { generatePoint } from './mock/point.js';
import { RenderPosition, POINT_COUNT, MenuItem } from './const.js';
import HeaderPresenter from './presenter/header.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const buttonNewPoint = document.querySelector('.trip-main__event-add-btn');
const pageBodyContainer = document.querySelectorAll('.page-body__container');

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

const siteMenuComponent = new SiteMenuView();
renderElement(siteNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel);

let statisticsComponent = null;

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();

      remove(statisticsComponent);

      buttonNewPoint.disabled = false;
      showClass(pageBodyContainer, 'page-body__container-for-line');
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      remove(statisticsComponent);

      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      renderElement(siteEventsElement, statisticsComponent, RenderPosition.BEFOREEND);

      buttonNewPoint.disabled = true;
      hideClass(pageBodyContainer, 'page-body__container-for-line');
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
tripPresenter.init();
