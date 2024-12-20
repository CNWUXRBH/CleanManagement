import React from 'react';
import Card from '../../shared/Card';
import { Package, AlertTriangle, Ban, TrendingUp } from 'lucide-react';

interface InventoryStatisticsProps {
  statistics: {
    totalItems: number;
    lowStockItems: number;
    outOfStockItems: number;
    monthlyConsumption: number;
  };
}

const InventoryStatistics: React.FC<InventoryStatisticsProps> = ({ statistics }) => {
  const stats = [
    {
      title: '总库存物品',
      value: statistics.totalItems,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: '库存不足',
      value: statistics.lowStockItems,
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      bgColor: 'bg-amber-50'
    },
    {
      title: '库存耗尽',
      value: statistics.outOfStockItems,
      icon: <Ban className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-50'
    },
    {
      title: '月度消耗',
      value: statistics.monthlyConsumption,
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default InventoryStatistics;