import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm', { locale: zhCN });
};

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { locale: zhCN, addSuffix: true });
};