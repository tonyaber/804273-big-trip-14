import dayjs from 'dayjs';
import * as minMax from 'dayjs/plugin/minMax';
import AbstractView from './abstract.js';

dayjs.extend(minMax);

const createSiteTripInfoTemplate = (points) => {
  //массив со всех городов
  const cities = points.map((element) => element.description.name);

  //массив всех городов без повторов
  const citiesNotRepeat = Array.from(new Set(cities)).join(' &mdash; ');

  //первая дата с массива всех дат
  const dateFrom = points.map((element) => dayjs(element.dateFrom));
  const dateFromTemplate = dayjs.min(dateFrom).format('MMM DD');

  //последняя дата с массива всех дат
  const dateTo = points.map((element) => dayjs(element.dateTo));
  const dateToTemplate = dayjs.max(dateTo).format('MMM DD');

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${citiesNotRepeat}</h1>

              <p class="trip-info__dates">${dateFromTemplate}&nbsp;&mdash;&nbsp;${dateToTemplate}</p>
            </div>
          </section>`;
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
