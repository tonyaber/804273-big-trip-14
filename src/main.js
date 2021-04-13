import { renderElement, renderPoint } from './utils/render.js';
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
renderElement(siteMenuElement, new MenuView(), RenderPosition.BEFOREEND);

const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
renderElement(siteFiltersElement, new FiltersView(), RenderPosition.BEFOREEND);

const siteEventsElement = document.querySelector('.trip-events');

if (!points.length) {
  renderElement(siteEventsElement, new EmptyListView(), RenderPosition.BEFOREEND);
}
else {
  renderElement(siteHeaderElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);

  const sitePriceElement = siteHeaderElement.querySelector('.trip-main__trip-info');
  renderElement(sitePriceElement, new PriceView(points), RenderPosition.BEFOREEND);

  renderElement(siteEventsElement, new SortView(), RenderPosition.BEFOREEND);

  const pointListComponent = new ListView();
  renderElement(siteEventsElement, pointListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < POINT_COUNT-1; i++){
    renderPoint(pointListComponent,points[i]);
  }
}

