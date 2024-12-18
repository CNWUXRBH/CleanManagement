import React from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { Plus, FileDown } from 'lucide-react';
import AdjustmentList from '../components/inventory/adjustment/AdjustmentList';
import AdjustmentForm from '../components/inventory/adjustment/AdjustmentForm';
import useInventoryAdjustments from '../hooks/inventory/useInventoryAdjustments';

const InventoryAdjustmentPage: React.FC = () => {
  const { adjustments, isLoading, addAdjustment } = useInventoryAdjustments();
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = async (adjustment: any) => {
    const success = await addAdjustment(adjustment);
    if (success) {
      setShowForm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">库存盘点</h1>
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

      {showForm && (
        <Card className="mb-6">
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

export default InventoryAdjustmentPage;