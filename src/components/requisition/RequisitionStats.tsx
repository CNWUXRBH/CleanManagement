import React from 'react';
import { Requisition } from '../../types/requisition';
import { Package, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import Card from '../shared/Card';

interface RequisitionStatsProps {
  requisitions: Requisition[];
}

const RequisitionStats: React.FC<RequisitionStatsProps> = ({ requisitions }) => {
  const stats = [
    {
      title: '本月领用',
      value: requisitions.length,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: '待审批',
      value: requisitions.filter(r => r.status === 'pending').length,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
    },
    {
      title: '已完成',
      value: requisitions.filter(r => r.status === 'completed').length,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: '同比增长',
      value: '15.2%',
      icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
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

export default RequisitionStats;