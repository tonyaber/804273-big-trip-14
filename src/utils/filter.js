import { FilterType } from '../const';
import dayjs from 'dayjs';

const filterPoint = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateTo).isAfter(dayjs(), 'minute')),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateFrom).isBefore(dayjs(), 'minute')),
};
export { filterPoint };
