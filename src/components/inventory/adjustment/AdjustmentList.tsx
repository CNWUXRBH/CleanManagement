import React from 'react';
import { formatDate } from '../../../utils/date';
import StatusBadge from '../../shared/StatusBadge';
import Button from '../../shared/Button';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

interface AdjustmentListProps {
  adjustments: any[];
  isLoading: boolean;
}

const AdjustmentList: React.FC<AdjustmentListProps> = ({ adjustments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              盘点日期
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              盘点物品数
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              盘盈数量
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              盘亏数量
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
          {adjustments.map((adjustment) => (
            <tr key={adjustment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(new Date(adjustment.date))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {adjustment.adjustments.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                +{adjustment.surplus || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                -{adjustment.shortage || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge 
                  status={adjustment.status === 'pending' ? 'warning' : 'success'}
                  text={adjustment.status === 'pending' ? '待审核' : '已完成'}
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
                  {adjustment.status === 'pending' && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<CheckCircle className="w-4 h-4" />}
                      >
                        审核
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

export default AdjustmentList;