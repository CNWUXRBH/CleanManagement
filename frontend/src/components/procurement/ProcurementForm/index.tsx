import React from 'react';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import BasicInfo from './BasicInfo';
import ItemList from './ItemList';
import OrderSummary from './OrderSummary';
import { Plus, Save, X } from 'lucide-react';
import useProcurementForm from '../../../hooks/procurement/useProcurementForm';

interface ProcurementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ProcurementForm: React.FC<ProcurementFormProps> = ({ onSubmit, onCancel }) => {
  const {
    department,
    setDepartment,
    items,
    errors,
    addItem,
    removeItem,
    updateItem,
    validate
  } = useProcurementForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ department, items });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="space-y-6">
          <BasicInfo
            department={department}
            onDepartmentChange={setDepartment}
            error={errors.department}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">采购物品</h3>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={addItem}
              >
                添加物品
              </Button>
            </div>
            <ItemList
              items={items}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
              errors={errors}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                icon={<X className="w-4 h-4" />}
                onClick={onCancel}
              >
                取消
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={<Save className="w-4 h-4" />}
              >
                提交采购申请
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <OrderSummary items={items} department={department} />
        </div>
      </div>
    </form>
  );
};

export default ProcurementForm;