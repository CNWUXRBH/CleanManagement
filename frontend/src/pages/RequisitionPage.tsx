import React, { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { Plus, FileDown } from 'lucide-react';
import RequisitionList from '../components/requisition/RequisitionList';
import RequisitionForm from '../components/requisition/RequisitionForm';
import useRequisitions from '../hooks/requisition/useRequisitions';

const RequisitionPage: React.FC = () => {
  const { requisitions, isLoading } = useRequisitions();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: any) => {
    // TODO: 实现提交逻辑
    console.log('Form submitted:', data);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">领用管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理部门物资领用申请和审批。
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
            onClick={() => setShowForm(true)}
          >
            新建领用
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <RequisitionForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      <Card>
        <RequisitionList
          requisitions={requisitions}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default RequisitionPage;