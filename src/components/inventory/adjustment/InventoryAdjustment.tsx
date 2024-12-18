import React, { useState } from 'react';
import AdjustmentList from './AdjustmentList';
import AdjustmentForm from './AdjustmentForm';
import AdjustmentSummary from './AdjustmentSummary';
import useInventoryAdjustments from '../../../hooks/inventory/useInventoryAdjustments';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Plus, FileDown } from 'lucide-react';

const InventoryAdjustment: React.FC = () => {
  const { adjustments, isLoading, addAdjustment } = useInventoryAdjustments();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (adjustment: any) => {
    const success = await addAdjustment(adjustment);
    if (success) {
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">库存盘点</h2>
          <p className="mt-1 text-sm text-gray-500">
            管理库存盘点记录，处理盘盈盘亏情况。
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="secondary"
            icon={<FileDown className="w-4 h-4" />}
            onClick={() => console.log('Export adjustments')}
          >
            导出记录
          </Button>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowForm(true)}
          >
            新建盘点
          </Button>
        </div>
      </div>

      <AdjustmentSummary
        totalItems={adjustments.length}
        totalSurplus={adjustments.reduce((sum, adj) => sum + (adj.surplus || 0), 0)}
        totalShortage={adjustments.reduce((sum, adj) => sum + (adj.shortage || 0), 0)}
      />

      {showForm && (
        <Card>
          <AdjustmentForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      <Card>
        <AdjustmentList
          adjustments={adjustments}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default InventoryAdjustment;