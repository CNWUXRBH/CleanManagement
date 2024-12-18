import React from 'react';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';
import Card from '../shared/Card';

const AnalyticsSummary: React.FC = () => {
  const stats = [
    {
      title: '本月消耗量',
      value: '2,580',
      change: '+12.5%',
      trend: 'up',
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: '库存总值',
      value: '¥128,500',
      change: '-5.8%',
      trend: 'down',
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: '采购支出',
      value: '¥45,680',
      change: '+8.2%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      bgColor: 'bg-amber-50',
    },
    {
      title: '库存周转率',
      value: '3.2',
      change: '+0.4',
      trend: 'up',
      icon: <TrendingDown className="w-6 h-6 text-indigo-600" />,
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
              <p className={`text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsSummary;