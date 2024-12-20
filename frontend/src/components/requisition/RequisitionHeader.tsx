import React from 'react';
import Button from '../shared/Button';
import { Plus, FileDown } from 'lucide-react';

interface RequisitionHeaderProps {
  onCreateNew: () => void;
}

const RequisitionHeader: React.FC<RequisitionHeaderProps> = ({ onCreateNew }) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">领用管理</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理物品领用申请、审批流程和领用记录。
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={() => console.log('Export requisitions')}
        >
          导出记录
        </Button>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={onCreateNew}
        >
          新建领用
        </Button>
      </div>
    </div>
  );
};

export default RequisitionHeader;