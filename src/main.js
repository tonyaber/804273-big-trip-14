import { renderElement, renderPoint } from './utils.js';
import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import PriceView from './view/price.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import ListView from './view/list.js';
import EmptyListView from './view/empty-list.js';
import { generatePoint } from './mock/point.js';
import { RenderPosition, POINT_COUNT } from './const.js';

const points = new Array(POINT_COUNT).fill().map(generatePoint);

//находим нужные элементы в разметке и добавляем к ним шаблоны
const siteHeaderElement = document.querySelector('.trip-main');

const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
renderElement(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);

const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
renderElement(siteFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const siteEventsElement = document.querySelector('.trip-events');

if (!points.length) {
  renderElement(siteEventsElement, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
}
else {
  renderElement(siteHeaderElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);

  const sitePriceElement = siteHeaderElement.querySelector('.trip-main__trip-info');
  renderElement(sitePriceElement, new PriceView(points).getElement(), RenderPosition.BEFOREEND);

  renderElement(siteEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

  const pointListComponent = new ListView();
  renderElement(siteEventsElement, pointListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < POINT_COUNT-1; i++){
    renderPoint(pointListComponent.getElement(),points[i]);
  }
}

