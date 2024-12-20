import React, { useState } from 'react';
import { Specification, Category } from '../../types/basicData';
import Button from '../shared/Button';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { validateSpecification } from '../../utils/basicData/validation';

interface SpecificationFormProps {
  specification?: Specification;
  categories: Category[];
  onSubmit: (specification: Partial<Specification>) => void;
  onCancel: () => void;
}

const SpecificationForm: React.FC<SpecificationFormProps> = ({
  specification,
  categories,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Specification>>(
    specification || {
      name: '',
      code: '',
      description: '',
      categoryId: '',
      attributes: [],
      isActive: true
    }
  );

  const addAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...(prev.attributes || []), { name: '', value: '' }]
    }));
  };

  const removeAttribute = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes?.filter((_, i) => i !== index) || []
    }));
  };

  const updateAttribute = (index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes?.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      ) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSpecification(formData);
    if (!validation.isValid) {
      // Handle validation errors
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">规格名称</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">规格编码</label>
          <input
            type="text"
            value={formData.code || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">所属分类</label>
          <select
            value={formData.categoryId || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="">选择分类</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">描述</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">规格属性</label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={addAttribute}
            >
              添加属性
            </Button>
          </div>

          <div className="space-y-4">
            {formData.attributes?.map((attr, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={attr.name}
                  onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                  placeholder="属性名称"
                  className="flex-1 rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  value={attr.value}
                  onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                  placeholder="属性值"
                  className="flex-1 rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => removeAttribute(index)}
                >
                  删除
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">启用此规格</label>
          </div>
        </div>
      </div>

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

export default SpecificationForm;