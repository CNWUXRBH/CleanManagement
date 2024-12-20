import React from 'react';
import { ProcurementOrder } from '../../../types';
import Button from '../../shared/Button';
import StatusBadge from '../../shared/StatusBadge';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

interface OrderRowProps {
  order: ProcurementOrder;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (id: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, onApprove, onReject, onView }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { type: 'warning', text: '待审批' };
      case 'approved':
        return { type: 'success', text: '已批准' };
      case 'rejected':
        return { type: 'error', text: '已拒绝' };
      case 'completed':
        return { type: 'info', text: '已完成' };
      default:
        return { type: 'info', text: '未知状态' };
    }
  };

  const status = getStatusConfig(order.status);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.orderNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.requestDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.department}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ¥{order.totalAmount.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={status.type as any} text={status.text} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<FileText className="w-4 h-4" />}
            onClick={() => onView(order.id)}
          >
            查看
          </Button>
          {order.status === 'pending' && (
            <>
              <Button
                variant="primary"
                size="sm"
                icon={<CheckCircle className="w-4 h-4" />}
                onClick={() => onApprove(order.id)}
              >
                批准
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<XCircle className="w-4 h-4" />}
                onClick={() => onReject(order.id)}
              >
                拒绝
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;