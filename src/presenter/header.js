import { renderElement, replace, remove, show, hide } from '../utils/render.js';
import TripInfoView from '../view/trip-info.js';
import PriceView from '../view/price.js';
import SiteMenuView from '../view/menu.js';
import StatisticsView from '../view/stats.js';
import { RenderPosition, MenuItem } from '../const.js';

export default class Header {
  constructor(tripInfoContainer, tripFilterContainer, siteNavigationContainer, siteEventsElement, pointsModel, tripPresenter, filterPresenter, api) {
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._siteNavigationContainer = siteNavigationContainer;
    this._siteEventsElement = siteEventsElement;
    this._pointsModel = pointsModel;
    this._tripPresenter = tripPresenter;
    this._filterPresenter = filterPresenter;
    this._api = api;

    this._tripInfoComponent = null;
    this._priceComponent = null;
    this._siteMenuComponent = null;
    this._statisticsComponent = null;
    this._offers = [];

    this._buttonNewPoint = null;
    this._pageBodyContainer = null;
    this._buttonHeaderTable = null;
    this._buttonHeaderStats = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);

  }

  init() {
    const points = this._getPoints();
    this._offers = this._getOffers();
    const prevTripInfoComponent = this._tripInfoComponent;
    const prevPriceComponent = this._priceComponent;
    const prevSiteMenuComponent = this._siteMenuComponent;

    if (!points.length && prevSiteMenuComponent === null) {
      this._siteMenuComponent = new SiteMenuView();
      this._renderSiteMenu();
      return;
    }

    if (!points.length) {
      return;
    }

    this._tripInfoComponent = new TripInfoView(points);
    this._priceComponent = new PriceView(points);

    if (prevTripInfoComponent === null) {
      this.__renderHeader();
      return;
    }
    replace(this._tripInfoComponent, prevTripInfoComponent);
    replace(this._priceComponent, prevPriceComponent);

    this.__renderHeader();
  }

  _getOffers() {
    return this._pointsModel.getOffers();
  }

  __renderHeader() {
    this._renderTripInfo();
    this._renderPrice();
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

  _renderSiteMenu() {
    renderElement(this._siteNavigationContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);

    this._buttonNewPoint = document.querySelector('.trip-main__event-add-btn');
    this._pageBodyContainer = document.querySelectorAll('.page-body__container');
    this._buttonHeaderTable = document.querySelector('#TABLE');
    this._buttonHeaderStats = document.querySelector('#STATS');
    this._siteMenuComponent.setMenuClickHandler(this._handleSiteMenuClick);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.TABLE:
        this._tripPresenter.init();

        remove(this._statisticsComponent);
        show(this._buttonNewPoint, this._pageBodyContainer, this._buttonHeaderTable, this._buttonHeaderStats);

        this._filterPresenter.unblockFilters();
        this._tripPresenter.renderSortDefault();
        break;
      case MenuItem.STATS:
        this._tripPresenter.destroy();
        remove(this._statisticsComponent);

        this._statisticsComponent = new StatisticsView(this._pointsModel.getPoints(), this._offers);

        renderElement(this._siteEventsElement, this._statisticsComponent, RenderPosition.BEFOREEND);
        hide(this._buttonNewPoint, this._pageBodyContainer, this._buttonHeaderTable, this._buttonHeaderStats);

        this._filterPresenter.blockFilters();
        break;
    }
  }
}
