import React from 'react';
import Card from '../shared/Card';
import { Building2 } from 'lucide-react';

const DepartmentUsage: React.FC = () => {
  const departments = [
    {
      name: '清洁部',
      usage: 4580,
      amount: '¥45,800',
      percentage: 35,
    },
    {
      name: '后勤部',
      usage: 3270,
      amount: '¥32,700',
      percentage: 25,
    },
    {
      name: '工程部',
      usage: 2620,
      amount: '¥26,200',
      percentage: 20,
    },
    {
      name: '安保部',
      usage: 2620,
      amount: '¥26,200',
      percentage: 20,
    },
  ];

  return (
    <Card title="部门使用统计">
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-100 mr-3">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                <span className="text-sm text-gray-500">{dept.amount}</span>
              </div>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{dept.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DepartmentUsage;