import React from 'react';
import { InventoryMovement } from '../../../types/inventory';
import { formatDate } from '../../../utils/date';
import { getReasonText } from '../../../utils/inventoryMovement';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface MovementListProps {
  movements: InventoryMovement[];
  isLoading: boolean;
}

const MovementList: React.FC<MovementListProps> = ({ movements, isLoading }) => {
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
              日期
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              类型
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              原因
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              数量
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作人
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              备注
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movements.map((movement) => (
            <tr key={movement.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(new Date(movement.date))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {movement.type === 'in' ? (
                    <ArrowDownCircle className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <ArrowUpCircle className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  <span className={movement.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                    {movement.type === 'in' ? '入库' : '出库'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getReasonText(movement.reason)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {movement.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {movement.operatorId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {movement.note || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementList;