import AbstractView from './abstract.js';
const createSitePriceTemplate = (points) => {

  //считаем базовою стоимость всех поездок
  const basePrice = points.
    map((point) => point.basePrice).
    reduce((accumulator, price) => accumulator + price);

  //считаем стоимость дополнительных опций
  const offersPrice = points
    .map((point) => point.offers
      .map((offer) => offer.price)
      .reduce((accumulator, price) => accumulator + price))
    .reduce((accumulator, priceOfOffer) => accumulator + priceOfOffer);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice+offersPrice}</span>
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

