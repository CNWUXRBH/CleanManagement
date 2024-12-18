import { Item } from '../../types';
import { formatDate } from '../date';

interface ReportOptions {
  includeHeaders?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  format?: 'csv' | 'excel';
}

export const generateInventoryReport = (
  items: Item[],
  options: ReportOptions = {}
): string => {
  const headers = [
    '物品编码',
    '物品名称',
    '类别',
    '规格',
    '单位',
    '当前库存',
    '最小库存',
    '单价',
    '库存金额'
  ];

  const rows = items.map(item => [
    item.code,
    item.name,
    item.category,
    item.specification,
    item.unit,
    item.currentStock.toString(),
    item.minStock.toString(),
    item.price.toFixed(2),
    (item.currentStock * item.price).toFixed(2)
  ]);

  if (options.includeHeaders) {
    rows.unshift(headers);
  }

  return rows.map(row => row.join(',')).join('\n');
};

export const generateMovementReport = (
  movements: any[],
  options: ReportOptions = {}
): string => {
  const headers = [
    '日期',
    '类型',
    '物品',
    '数量',
    '操作人',
    '备注'
  ];

  const rows = movements.map(movement => [
    formatDate(new Date(movement.date)),
    movement.type === 'in' ? '入库' : '出库',
    movement.itemName,
    movement.quantity.toString(),
    movement.operatorId,
    movement.note || ''
  ]);

  if (options.includeHeaders) {
    rows.unshift(headers);
  }

  return rows.map(row => row.join(',')).join('\n');
};

export const downloadReport = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};