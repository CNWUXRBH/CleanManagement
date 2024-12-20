import React from 'react';
import { ProcurementOrder } from '../../../types';
import Button from '../../shared/Button';
import { 
  CheckCircle, 
  XCircle, 
  FileDown, 
  Printer,
  MessageSquare
} from 'lucide-react';
import { 
  canOrderBeApproved,
  canOrderBeRejected 
} from '../../../utils/procurement/orderStatus';

interface OrderActionsProps {
  order: ProcurementOrder;
  onApprove: () => void;
  onReject: () => void;
  onExport: () => void;
  onPrint: () => void;
  onComment: () => void;
  isProcessing?: boolean;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  onApprove,
  onReject,
  onExport,
  onPrint,
  onComment,
  isProcessing = false
}) => {
  return (
    <div className="flex flex-col space-y-3">
      {canOrderBeApproved(order.status as any) && (
        <Button
          variant="primary"
          icon={<CheckCircle className="w-4 h-4" />}
          onClick={onApprove}
          disabled={isProcessing}
          isLoading={isProcessing}
          className="w-full justify-center"
        >
          批准采购申请
        </Button>
      )}

      {canOrderBeRejected(order.status as any) && (
        <Button
          variant="danger"
          icon={<XCircle className="w-4 h-4" />}
          onClick={onReject}
          disabled={isProcessing}
          className="w-full justify-center"
        >
          拒绝采购申请
        </Button>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={onExport}
          className="justify-center"
        >
          导出
        </Button>
        <Button
          variant="secondary"
          icon={<Printer className="w-4 h-4" />}
          onClick={onPrint}
          className="justify-center"
        >
          打印
        </Button>
      </div>

      <Button
        variant="secondary"
        icon={<MessageSquare className="w-4 h-4" />}
        onClick={onComment}
        className="w-full justify-center"
      >
        添加备注
      </Button>
    </div>
  );
};

export default OrderActions;