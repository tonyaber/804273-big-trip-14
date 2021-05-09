import { FilterType } from '../const';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom).isAfter(dayjs(), 'day')),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateFrom).isBefore(dayjs(), 'day')),
};
export { filter };
