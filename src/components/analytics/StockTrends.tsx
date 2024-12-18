import React from 'react';
import Card from '../shared/Card';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StockTrends: React.FC = () => {
  const trends = [
    {
      name: '洗手液',
      change: '+28%',
      trend: 'up',
      amount: '1,280',
      value: '¥15,360',
    },
    {
      name: '抹布',
      change: '-12%',
      trend: 'down',
      amount: '850',
      value: '¥2,975',
    },
    {
      name: '清洁剂',
      change: '+15%',
      trend: 'up',
      amount: '620',
      value: '¥15,500',
    },
    {
      name: '垃圾袋',
      change: '-8%',
      trend: 'down',
      amount: '1,500',
      value: '¥3,000',
    },
  ];

  return (
    <Card title="库存变化趋势">
      <div className="space-y-4">
        {trends.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <div className="flex items-center mt-1">
                {item.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900">{item.amount}件</p>
              <p className="text-sm text-gray-500">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StockTrends;