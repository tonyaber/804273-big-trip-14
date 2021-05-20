import { FilterType } from '../const';
import dayjs from 'dayjs';

const filterPoint = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom).isAfter(dayjs(), 'day')),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateFrom).isBefore(dayjs(), 'day')),
};
export { filterPoint };
