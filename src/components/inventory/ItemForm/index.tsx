import React from 'react';
import { Item } from '../../../types';
import { Category, Unit, Specification } from '../../../types/basicData';
import Button from '../../shared/Button';
import { Save, X } from 'lucide-react';
import BasicInfo from './BasicInfo';
import StockInfo from './StockInfo';
import SupplierInfo from './SupplierInfo';
import { useItemForm } from '../../../hooks/inventory/useItemForm';

interface ItemFormProps {
  item?: Item;
  categories: Category[];
  units: Unit[];
  specifications: Specification[];
  onSubmit: (item: Partial<Item>) => void;
  onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  item,
  categories,
  units,
  specifications,
  onSubmit,
  onCancel
}) => {
  const {
    formData,
    errors,
    updateBasicInfo,
    updateStockInfo,
    updateSupplierInfo,
    validate
  } = useItemForm(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInfo
        data={formData}
        categories={categories}
        units={units}
        specifications={specifications}
        errors={errors}
        onChange={updateBasicInfo}
      />

      <StockInfo
        data={formData}
        errors={errors}
        onChange={updateStockInfo}
      />

      <SupplierInfo
        data={formData}
        errors={errors}
        onChange={updateSupplierInfo}
      />

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
          保存
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;