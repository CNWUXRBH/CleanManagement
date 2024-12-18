import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface ApprovalStatusProps {
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: string;
  approver?: string;
}

const ApprovalStatus: React.FC<ApprovalStatusProps> = ({
  status,
  timestamp,
  approver
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          text: '已批准',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          text: '已拒绝',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          text: '待审批',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`p-4 rounded-lg ${config.bgColor}`}>
      <div className="flex items-center">
        {config.icon}
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${config.textColor}`}>
            {config.text}
          </h3>
          {(timestamp || approver) && (
            <p className="mt-1 text-sm text-gray-500">
              {timestamp && `审批时间：${timestamp}`}
              {approver && ` · 审批人：${approver}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalStatus;