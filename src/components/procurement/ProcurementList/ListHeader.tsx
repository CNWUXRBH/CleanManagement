import React from 'react';
import Button from '../../shared/Button';
import { Plus, FileDown } from 'lucide-react';

interface ListHeaderProps {
  onCreateNew: () => void;
  onExport: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({ onCreateNew, onExport }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">采购管理</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理采购申请、审批流程和采购订单。
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={onExport}
        >
          导出列表
        </Button>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={onCreateNew}
        >
          新建采购单
        </Button>
      </div>
    </div>
  );
};

export default ListHeader;