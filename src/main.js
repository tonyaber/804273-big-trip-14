import { createSiteTripInfoTemplate } from './view/trip-info.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createSitePriceTemplate } from './view/price.js';
import { createSiteFiltersTemplate } from './view/filters.js';
import { createSiteSortTemplate } from './view/sort.js';
import { createSiteListTemplate } from './view/list.js';
import { createSiteEditPointTemplate } from './view/edit-point.js';
import { createSitePointTemplate } from './view/point.js';
import { createSiteNewPointTemplate } from './view/new-point.js';
import { generatePoint } from './mock/mock-point.js';
//количество точек маршрута в списке
const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

//создаем функцию для добавления елементов в разметку
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//находим нужные елементы в разметке и добавляем к ним шаблоны
const siteHeaderElement = document.querySelector('.trip-main');
render(siteHeaderElement, createSiteTripInfoTemplate(), 'afterbegin');

const sitePriceElement = siteHeaderElement.querySelector('.trip-main__trip-info');
render(sitePriceElement, createSitePriceTemplate(), 'beforeend');

const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteFiltersElement, createSiteFiltersTemplate(), 'beforeend');

const siteEventsElement = document.querySelector('.trip-events');
render(siteEventsElement, createSiteSortTemplate(), 'beforeend');
render(siteEventsElement, createSiteListTemplate(), 'beforeend');

const siteListElement = siteEventsElement.querySelector('.trip-events__list');
render(siteListElement, createSiteEditPointTemplate(), 'afterbegin');

for (let i = 0; i < POINT_COUNT; i++){
  render(siteListElement, createSitePointTemplate(points[i]), 'beforeend');
}

render(siteListElement, createSiteNewPointTemplate(), 'beforeend');
