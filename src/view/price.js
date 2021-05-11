import AbstractView from './abstract.js';
const createSitePriceTemplate = (points) => {

  //считаем базовою стоимость всех поездок
  const basePrice = points.
    map((point) => point.basePrice).
    reduce((accumulator, price) => Number(accumulator)+ Number(price));

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice}</span>
          </p>`;
};

export default class Price extends AbstractView{
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createSitePriceTemplate(this._points);
  }
}

