import React from 'react';
import { Supplier } from '../../../types';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Edit, Trash2, MessageSquare, FileText, Ban } from 'lucide-react';

interface SupplierActionsProps {
  supplier: Supplier;
}

const SupplierActions: React.FC<SupplierActionsProps> = ({ supplier }) => {
  return (
    <div className="space-y-6">
      <Card title="快捷操作">
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full justify-center"
            icon={<MessageSquare className="w-4 h-4" />}
          >
            发送消息
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-center"
            icon={<FileText className="w-4 h-4" />}
          >
            查看合同
          </Button>
        </div>
      </Card>

      <Card title="供应商管理">
        <div className="space-y-4">
          <Button
            variant="secondary"
            className="w-full justify-center"
            icon={<Edit className="w-4 h-4" />}
          >
            编辑信息
          </Button>
          <Button
            variant="danger"
            className="w-full justify-center"
            icon={<Ban className="w-4 h-4" />}
          >
            终止合作
          </Button>
          <Button
            variant="danger"
            className="w-full justify-center"
            icon={<Trash2 className="w-4 h-4" />}
          >
            删除供应商
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SupplierActions;