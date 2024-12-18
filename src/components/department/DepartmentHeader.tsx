import React from 'react';
import Button from '../shared/Button';
import { Plus, FileDown } from 'lucide-react';

const DepartmentHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">部门管理</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理部门信息、人员配置和物资分配。
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={() => console.log('Export departments')}
        >
          导出列表
        </Button>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => console.log('Add new department')}
        >
          添加部门
        </Button>
      </div>
    </div>
  );
};

export default DepartmentHeader;