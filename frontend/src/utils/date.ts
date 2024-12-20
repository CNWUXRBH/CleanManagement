import { format, formatDistance, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm');
};

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { locale: zhCN, addSuffix: true });
};

export const formatTimeAgo = (date: Date): string => {
  return formatDistance(date, new Date(), { addSuffix: true });
};