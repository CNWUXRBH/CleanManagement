import React from 'react';
import MovementList from '../components/inventory/movement/MovementList';
import MovementForm from '../components/inventory/movement/MovementForm';
import MovementSummary from '../components/inventory/movement/MovementSummary';
import useInventoryMovements from '../hooks/inventory/useInventoryMovements';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { Plus, FileDown } from 'lucide-react';

const InventoryMovementPage: React.FC = () => {
  const { movements, isLoading, addMovement } = useInventoryMovements('all');
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = async (movement: any) => {
    const success = await addMovement(movement);
    if (success) {
      setShowForm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">库存移动记录</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理所有入库、出库和库存调整记录。
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="secondary"
            icon={<FileDown className="w-4 h-4" />}
            onClick={() => console.log('Export movements')}
          >
            导出记录
          </Button>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowForm(true)}
          >
            新建记录
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <MovementSummary summary={{
          totalIn: 1500,
          totalOut: 800,
          balance: 700
        }} />
      </div>

      {showForm && (
        <Card className="mb-6">
          <MovementForm
            itemId="all"
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      <Card>
        <MovementList
          movements={movements}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default InventoryMovementPage;