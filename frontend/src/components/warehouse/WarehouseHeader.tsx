import React from 'react';
import Button from '../shared/Button';
import { Plus, FileDown } from 'lucide-react';

const WarehouseHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仓库管理</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理仓库信息、库位设置和库存分布。
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={() => console.log('Export warehouses')}
        >
          导出列表
        </Button>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => console.log('Add new warehouse')}
        >
          添加仓库
        </Button>
      </div>
    </div>
  );
};

export default WarehouseHeader;