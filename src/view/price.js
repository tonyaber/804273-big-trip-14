import AbstractView from './abstract.js';
const createSitePriceTemplate = (points) => {

  //считаем базовою стоимость всех поездок
  const basePrice = points
    .map((point) => point.basePrice)
    .reduce((accumulator, price) => Number(accumulator) + Number(price));

  //считаем стоимость дополнительных опций
  const offersPrice = points
    .map((point) => {
      if (point.offers === null || point.offers === undefined||!point.offers.length) {
        return 0;
      }
      return point.offers
        .map((offer) => offer.price).reduce((accumulator, price) => Number(accumulator) + Number(price));
    })
    .reduce((accumulator, priceOfOffer) => Number(accumulator) + Number(priceOfOffer));

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice + offersPrice}</span>
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

