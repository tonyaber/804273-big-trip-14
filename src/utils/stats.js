import dayjs from 'dayjs';

const countMoney = (points, type) => {
  const money = points.filter((point) => point.type.toLowerCase() === type.toLowerCase());
  if (!money.length) {
    return 0;
  }
  return money.map((point) => point.basePrice)
    .reduce((accumulator, price) => Number(accumulator) + Number(price));
};

const countTypes = (points, type) => {
  return points.filter((point) => point.type.toLowerCase() === type.toLowerCase()).length;
};

const countTime = (points, type) => {
  const time = points.filter((point) => point.type.toLowerCase() === type.toLowerCase());
  if (!time.length) {
    return 0;
  }
  return time.map((point) => dayjs(point.dateTo).diff(dayjs(point.dateFrom)))
    .reduce((accumulator, time) => accumulator + time);
};

const formatTime = (millisecond) => {
  const quantityMinutes = Math.round(millisecond / 60000);
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
};

export { countMoney, countTime, countTypes, formatTime };
