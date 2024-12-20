import React from 'react';
import { Department } from '../../types';
import { Users, Package, TrendingUp, Building } from 'lucide-react';
import Card from '../shared/Card';

interface DepartmentStatsProps {
  departments: Department[];
}

const DepartmentStats: React.FC<DepartmentStatsProps> = ({ departments }) => {
  const stats = [
    {
      title: '部门总数',
      value: departments.length,
      icon: <Building className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: '员工总数',
      value: '156',
      icon: <Users className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: '本月领用量',
      value: '2,450',
      icon: <Package className="w-6 h-6 text-amber-600" />,
      bgColor: 'bg-amber-50',
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

export default DepartmentStats;