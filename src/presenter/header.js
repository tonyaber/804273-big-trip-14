import { renderElement, replace } from '../utils/render.js';
import TripInfoView from '../view/trip-info.js';
import NavigationView from '../view/menu.js';
import PriceView from '../view/price.js';
import { RenderPosition } from '../const.js';

export default class Header {
  constructor(tripInfoContainer, tripFilterContainer, siteNavigationContainer, pointsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripNavigationContainer = siteNavigationContainer;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = null;
    this._priceComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._navigationComponent = new NavigationView();

    this._pointsModel.addObserver(this._handleModelEvent);

  }

  init() {
    const points = this._getPoints();
    const prevTripInfoComponent = this._tripInfoComponent;
    const prevPriceComponent = this._priceComponent;

    if (prevTripInfoComponent === null) {
      this._tripInfoComponent = new TripInfoView(points);
      this._priceComponent = new PriceView(points);
      this.__renderHeader();
      return;
    }
    this._tripInfoComponent = new TripInfoView(points);
    this._priceComponent = new PriceView(points);
    replace(this._tripInfoComponent, prevTripInfoComponent);
    replace(this._priceComponent, prevPriceComponent);
    this.__renderHeader();
  }

  __renderHeader() {
    this._renderTripInfo();
    this._renderPrice();
    this._renderNavigation();
  }

  _getPoints() {
    return this._pointsModel.getPoints();
  }

  _renderTripInfo() {
    renderElement(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.BEFOREEND);
  }

  _renderPrice() {
    renderElement(this._tripInfoContainer, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _renderNavigation() {
    renderElement(this._tripNavigationContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this.init();
  }
}
