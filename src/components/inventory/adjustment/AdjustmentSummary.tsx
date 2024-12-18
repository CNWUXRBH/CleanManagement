import React from 'react';
import { Package, ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../../shared/Card';

interface AdjustmentSummaryProps {
  totalItems: number;
  totalSurplus: number;
  totalShortage: number;
}

const AdjustmentSummary: React.FC<AdjustmentSummaryProps> = ({
  totalItems,
  totalSurplus,
  totalShortage
}) => {
  const stats = [
    {
      title: '盘点物品数',
      value: totalItems,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: '盘盈数量',
      value: totalSurplus,
      icon: <ArrowUp className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50'
    },
    {
      title: '盘亏数量',
      value: totalShortage,
      icon: <ArrowDown className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdjustmentSummary;