import React from 'react';
import Card from '../shared/Card';
import { Building2 } from 'lucide-react';

interface DepartmentData {
  name: string;
  usage: number;
  percentage: number;
}

const DepartmentUsage: React.FC = () => {
  // Mock data
  const departments: DepartmentData[] = [
    { name: '清洁部', usage: 580, percentage: 35 },
    { name: '后勤部', usage: 420, percentage: 25 },
    { name: '保安部', usage: 320, percentage: 20 },
    { name: '餐饮部', usage: 180, percentage: 12 },
    { name: '工程部', usage: 130, percentage: 8 }
  ];

  return (
    <Card title="部门使用统计">
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex items-center">
            <div className="p-2 rounded-lg bg-gray-100 mr-3">
              <Building2 className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                <span className="text-sm text-gray-500">{dept.usage}件</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${dept.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DepartmentUsage;