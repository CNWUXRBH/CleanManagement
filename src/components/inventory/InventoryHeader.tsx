import React from 'react';
import Button from '../shared/Button';
import { Plus, FileDown, Upload } from 'lucide-react';

interface InventoryHeaderProps {
  onAddItem: () => void;
  onImport: () => void;
  onExport: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onAddItem,
  onImport,
  onExport
}) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">库存管理</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理所有清洁用品的库存情况，包括入库、出库记录和库存预警。
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          icon={<Upload className="w-4 h-4" />}
          onClick={onImport}
        >
          导入数据
        </Button>
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
          onClick={onAddItem}
        >
          添加物品
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;