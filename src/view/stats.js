import SmartView from './smart.js';
import Chart from 'chart.js';
import { TYPES } from '../const.js';
import { countMoney, countTypes, countTime, formatTime } from '../utils/stats.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderMoneyChart = (moneyCtx, trip) => {
  trip.sort((a, b) => b.money - a.money);
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: trip.map((point) => point.type),
      datasets: [{
        data: trip.map((point) => point.money),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => '€ ' + val,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, trip) => {
  trip.sort((a, b) => b.types - a.types);
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: trip.map((point)=>point.type),
      datasets: [{
        data: trip.map((point)=>point.types),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => val + 'x',
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, trip) => {
  trip.sort((a, b) => b.time - a.time);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: trip.map((point)=>point.type),
      datasets: [{
        data: trip.map((point)=>point.time),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => formatTime(val),
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>`;
};

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._points = points;
    this._moneyCart = null;
    this._typeCart = null;
    this._timeCard = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
    if (this._moneyCart !== null) {
      this._moneyCart = null;
    }
    if (this._typeCart !== null) {
      this._typeCart = null;
    }
    if (this._timeCart !== null) {
      this._timeCart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._points);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyCart == !null) {
      this._moneyCart = null;
    }
    if (this._typeCart == !null) {
      this._typeCart = null;
    }
    if (this._timeCart !== null) {
      this._timeCart = null;
    }
    const money = TYPES.map((type) => countMoney(this._points, type));
    const types = TYPES.map((type) => countTypes(this._points, type));
    const time = TYPES.map((type) => countTime(this._points, type));
    const trip = TYPES.map((item, index) => ({ type: item, money: money[index], types: types[index], time: time[index] }));

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * TYPES.length;
    typeCtx.height = BAR_HEIGHT * TYPES.length;
    timeCtx.height = BAR_HEIGHT * TYPES.length;

    this._moneyCart = renderMoneyChart(moneyCtx, trip);
    this._typeCart = renderTypeChart(typeCtx, trip);
    this._timeCart = renderTimeChart(timeCtx, trip);
  }
}
