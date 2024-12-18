import React from 'react';
import { Requisition } from '../../types/requisition';
import StatusBadge from '../shared/StatusBadge';
import Button from '../shared/Button';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface RequisitionListProps {
  requisitions: Requisition[];
  isLoading: boolean;
}

const RequisitionList: React.FC<RequisitionListProps> = ({
  requisitions,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              领用单号
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              申请日期
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              申请部门
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              领用物品
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              状态
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requisitions.map((requisition) => (
            <tr key={requisition.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {requisition.requisitionNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(new Date(requisition.requestDate))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {requisition.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {requisition.items.length} 件
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge
                  status={requisition.status === 'pending' ? 'warning' : 'success'}
                  text={requisition.status === 'pending' ? '待审批' : '已完成'}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<FileText className="w-4 h-4" />}
                  >
                    查看
                  </Button>
                  {requisition.status === 'pending' && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<CheckCircle className="w-4 h-4" />}
                      >
                        批准
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<XCircle className="w-4 h-4" />}
                      >
                        拒绝
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequisitionList;