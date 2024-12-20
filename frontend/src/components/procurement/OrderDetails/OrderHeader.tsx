import React from 'react';
import { ProcurementOrder } from '../../../types';
import StatusBadge from '../../shared/StatusBadge';
import { Calendar, Building2, DollarSign } from 'lucide-react';
import { getStatusConfig } from '../../../utils/procurement/orderStatus';

interface OrderHeaderProps {
  order: ProcurementOrder;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
  const status = getStatusConfig(order.status as any);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h2>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {order.requestDate}
            </div>
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              {order.department}
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              ¥{order.totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
        <StatusBadge status={status.color as any} text={status.label} />
      </div>
      <p className="text-sm text-gray-600">{status.description}</p>
    </div>
  );
};

export default OrderHeader;