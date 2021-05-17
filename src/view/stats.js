import SmartView from './smart.js';
import Chart from 'chart.js';
import { TYPES } from '../const.js';
import dayjs from 'dayjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const countMoney = (points, type, obj) => {
  const money = points.filter((point) => point.type === type);
  if (!money.length) {
    return obj[type] = 0;
  }
  return obj[type] = money.map((point) => point.basePrice)
    .reduce((accumulator, price) => accumulator + price);
};

const countTripsByType = (points, type, obj) => {
  return obj[type] = points.filter((point) => point.type === type).length;
};

const countTime = (points, type, obj) => {
  const time = points.filter((point) => point.type === type);
  if (!time.length) {
    return obj[type] = 0;
  }
  return obj[type] = time.map((point) => dayjs(point.dateTo).diff(dayjs(point.dateFrom)))
    .reduce((accumulator, time) => accumulator + time);
};

const formatTime = (millisecond)=>{
  const quantityMinutes = millisecond/60000;
  let days = Math.floor(quantityMinutes / 1440);
  let hours = (quantityMinutes >= 1440) ?
    Math.floor(quantityMinutes % 1440 / 60) : Math.floor(quantityMinutes / 60);
  let minutes = (quantityMinutes >= 60) ? (quantityMinutes % 60) : quantityMinutes;

  if (days < 10) days = '0' + days;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }
  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
}

const typesWithPrice = {};

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;
//typeCtx.height = BAR_HEIGHT * 5;
//timeCtx.height = BAR_HEIGHT * 5;

const renderMoneyChart = (moneyCtx, points) => {
  //moneyCtx.height = BAR_HEIGHT * 5;
  TYPES.map((type) => countMoney(points, type, typesWithPrice));
  return new Chart(moneyCtx, {
    plugins: Object.keys(typesWithPrice),
    type: 'horizontalBar',
    data: {
      labels: TYPES,
      datasets: [{
        data:Object.values(typesWithPrice),
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
          formatter: (typesWithPrice) => '€ '+ typesWithPrice,
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
          barThickness: 44,
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

const renderTypeChart = (typeCtx, points) => {
  TYPES.map((type) => countTripsByType(points, type, typesWithPrice));
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(typesWithPrice),
      datasets: [{
        data: Object.values(typesWithPrice),
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
          formatter: (typesWithPrice) => typesWithPrice + 'x',
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
          barThickness: 44,
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

const renderTimeChart = (timeCtx, points) => {
  TYPES.map((type) => countTime(points, type, typesWithPrice));
  console.log(typesWithPrice)
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(typesWithPrice),
      datasets: [{
        data: Object.values(typesWithPrice),
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
          formatter: (typesWithPrice) => formatTime(typesWithPrice),
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
          barThickness: 44,
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

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    this._moneyCart = renderMoneyChart(moneyCtx, this._points);
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    this._typeCart = renderTypeChart(typeCtx, this._points);
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');
    this._timeCart = renderTimeChart(timeCtx, this._points);
  }
}
