export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed';

interface StatusConfig {
  label: string;
  color: string;
  description: string;
}

export const ORDER_STATUS: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: '待审批',
    color: 'yellow',
    description: '采购申请已提交，等待审批'
  },
  approved: {
    label: '已批准',
    color: 'green',
    description: '采购申请已获批准，可以进行采购'
  },
  rejected: {
    label: '已拒绝',
    color: 'red',
    description: '采购申请未通过审批'
  },
  completed: {
    label: '已完成',
    color: 'blue',
    description: '采购已完成并入库'
  }
};

export const getStatusConfig = (status: OrderStatus): StatusConfig => {
  return ORDER_STATUS[status] || ORDER_STATUS.pending;
};

export const isOrderEditable = (status: OrderStatus): boolean => {
  return status === 'pending' || status === 'rejected';
};

export const canOrderBeApproved = (status: OrderStatus): boolean => {
  return status === 'pending';
};

export const canOrderBeRejected = (status: OrderStatus): boolean => {
  return status === 'pending';
};