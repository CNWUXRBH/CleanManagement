import { ProcurementOrder } from '../../types';

export const generateExcelData = (orders: ProcurementOrder[]): string => {
  const headers = ['采购单号', '申请日期', '申请部门', '总金额', '状态'];
  const rows = orders.map(order => [
    order.orderNumber,
    order.requestDate,
    order.department,
    order.totalAmount.toFixed(2),
    getStatusText(order.status)
  ]);

  return [headers, ...rows]
    .map(row => row.join(','))
    .join('\\n');
};

export const downloadOrdersExcel = (orders: ProcurementOrder[]): void => {
  const data = generateExcelData(orders);
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', \`采购订单_\${new Date().toISOString().split('T')[0]}.csv\`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: '待审批',
    approved: '已批准',
    rejected: '已拒绝',
    completed: '已完成'
  };
  return statusMap[status] || status;
};