import React from 'react';
import Card from '../../shared/Card';
import { Package, AlertTriangle, Ban } from 'lucide-react';

interface StockLevelDistributionProps {
  normalStock: number;
  lowStock: number;
  outOfStock: number;
}

const StockLevelDistribution: React.FC<StockLevelDistributionProps> = ({
  normalStock,
  lowStock,
  outOfStock
}) => {
  const total = normalStock + lowStock + outOfStock;
  
  const calculatePercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const stats = [
    {
      label: '库存正常',
      value: normalStock,
      percentage: calculatePercentage(normalStock),
      icon: <Package className="w-5 h-5 text-green-600" />,
      bgColor: 'bg-green-50'
    },
    {
      label: '库存不足',
      value: lowStock,
      percentage: calculatePercentage(lowStock),
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      bgColor: 'bg-yellow-50'
    },
    {
      label: '库存耗尽',
      value: outOfStock,
      percentage: calculatePercentage(outOfStock),
      icon: <Ban className="w-5 h-5 text-red-600" />,
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <Card title="库存水平分布">
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`mx-auto w-12 h-12 ${stat.bgColor} rounded-lg 
              flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-sm text-gray-400">{stat.percentage}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StockLevelDistribution;