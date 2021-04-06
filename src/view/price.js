export const createSitePriceTemplate = (points) => {

  //считаем базовою стоимость всех поездок
  const basePrice = points.map((element) => element.base_price).reduce((accumulator, element) => accumulator + element);

  //считаем стоимость дополнительных опций
  const offersPrice = points
    .map((element) => element.offers
      .map((offer) => offer.price).reduce((accumulator, element) => accumulator + element))
    .reduce((accumulator, element) => accumulator + element);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice+offersPrice}</span>
          </p>`;
};
