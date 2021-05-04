import dayjs from 'dayjs';
import * as minMax from 'dayjs/plugin/minMax';
import AbstractView from './abstract.js';
import { sortDay } from '../utils/sort.js';

dayjs.extend(minMax);

const createSiteTripInfoTemplate = (points) => {
  //массив со всех городов
  let cities = points.sort(sortDay).map((city) => city.description.name);

  cities.length <= 3 ? cities.join(' &mdash; ')
    : cities = `${cities.slice(-1)} — ... — ${cities.slice(0, 1)}`;

  //первая дата с массива всех дат
  const dateFrom = points.map((point) => dayjs(point.dateFrom));
  const dateFromTemplate = dayjs.min(dateFrom).format('MMM DD');

  //последняя дата с массива всех дат
  const dateTo = points.map((point) => dayjs(point.dateTo));
  const dateToTemplate = dayjs.max(dateTo).format('MMM DD');

  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${cities}</h1>

            <p class="trip-info__dates">${dateFromTemplate}&nbsp;&mdash;&nbsp;${dateToTemplate}</p>
          </div>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createSiteTripInfoTemplate(this._points);
  }
}
