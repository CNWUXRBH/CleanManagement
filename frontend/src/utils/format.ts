import { logger } from './logger';

export const formatCurrency = (amount: number): string => {
  try {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  } catch (error) {
    logger.error('Error formatting currency:', error);
    return `¥${amount.toFixed(2)}`;
  }
};

export const formatNumber = (number: number, decimals: number = 2): string => {
  try {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
  } catch (error) {
    logger.error('Error formatting number:', error);
    return number.toFixed(decimals);
  }
};

export const formatPercent = (value: number): string => {
  try {
    return new Intl.NumberFormat('zh-CN', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  } catch (error) {
    logger.error('Error formatting percent:', error);
    return `${value.toFixed(1)}%`;
  }
};