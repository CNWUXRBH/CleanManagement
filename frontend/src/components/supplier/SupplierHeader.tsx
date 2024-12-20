import React from 'react';
import Button from '../shared/Button';
import { Plus, FileDown } from 'lucide-react';

const SupplierHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">供应商管理</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理供应商信息、合作记录和评价。
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={() => console.log('Export suppliers')}
        >
          导出列表
        </Button>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => console.log('Add new supplier')}
        >
          添加供应商
        </Button>
      </div>
    </div>
  );
};

export default SupplierHeader;