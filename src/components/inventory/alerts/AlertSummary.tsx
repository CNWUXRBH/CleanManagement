import React from 'react';
import { AlertTriangle, Package, Calendar, TrendingUp } from 'lucide-react';

interface AlertSummaryProps {
  counts: {
    lowStock: number;
    expiring: number;
    consumption: number;
  };
}

const AlertSummary: React.FC<AlertSummaryProps> = ({ counts }) => {
  const stats = [
    {
      label: '库存不足',
      value: counts.lowStock,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: '即将过期',
      value: counts.expiring,
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: '消耗异常',
      value: counts.consumption,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {React.cloneElement(stat.icon, { className: `w-6 h-6 ${stat.color}` })}
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSummary;