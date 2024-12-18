import React from 'react';
import { Category } from '../../../types/basicData';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Edit, Trash2, Tag } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete
}) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Tag className="w-4 h-4 mr-1" />
            <span>{category.code}</span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {category.isActive ? '启用' : '禁用'}
        </span>
      </div>

      {category.description && (
        <p className="text-sm text-gray-600 mb-4">{category.description}</p>
      )}

      <div className="flex justify-end space-x-2">
        <Button
          variant="secondary"
          size="sm"
          icon={<Edit className="w-4 h-4" />}
          onClick={onEdit}
        >
          编辑
        </Button>
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 className="w-4 h-4" />}
          onClick={onDelete}
        >
          删除
        </Button>
      </div>
    </Card>
  );
};

export default CategoryCard;