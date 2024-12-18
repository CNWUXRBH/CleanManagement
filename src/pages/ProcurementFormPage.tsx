import React from 'react';
import ProcurementForm from '../components/procurement/ProcurementForm';
import { ProcurementItem } from '../types';

const ProcurementFormPage: React.FC = () => {
  const handleSubmit = (data: { department: string; items: ProcurementItem[] }) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新建采购申请</h1>
        <p className="mt-1 text-sm text-gray-500">
          填写采购申请信息，包括申请部门和采购物品清单。
        </p>
      </div>

      <ProcurementForm 
        onSubmit={handleSubmit}
        onCancel={() => console.log('Form cancelled')}
      />
    </div>
  );
};

export default ProcurementFormPage;