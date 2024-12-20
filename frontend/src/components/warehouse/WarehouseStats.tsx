import React from 'react';
import { Warehouse } from '../../types';
import { Warehouse as WarehouseIcon, Package, AlertTriangle, BarChart3 } from 'lucide-react';
import Card from '../shared/Card';

interface WarehouseStatsProps {
  warehouses: Warehouse[];
}

const WarehouseStats: React.FC<WarehouseStatsProps> = ({ warehouses }) => {
  const stats = [
    {
      title: '仓库总数',
      value: warehouses.length,
      icon: <WarehouseIcon className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: '总库存量',
      value: '12,580',
      icon: <Package className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: '预警物品',
      value: '23',
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      bgColor: 'bg-amber-50',
    },
    {
      title: '库存周转率',
      value: '3.2',
      icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
    },
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

export default WarehouseStats;