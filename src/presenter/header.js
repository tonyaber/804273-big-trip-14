import { renderElement } from '../utils/render.js';
import TripInfoView from '../view/trip-info.js';
import NavigationView from '../view/menu.js';
import PriceView from '../view/price.js';
import { RenderPosition } from '../const.js';

export default class Header {
  constructor( tripInfoContainer, tripFilterContainer, siteNavigationContainer, pointsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripNavigationContainer = siteNavigationContainer;
    this._pointsModel = pointsModel;

    this._navigationComponent = new NavigationView();

 }

  init() {
    this._renderHeader();
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

  _renderHeader() {
    const points = this._getPoints();

    this._tripInfoComponent = new TripInfoView(points);
    this._priceComponent = new PriceView(points);
    this._renderTripInfo();
    this._renderPrice();
    this._renderNavigation();
  }
