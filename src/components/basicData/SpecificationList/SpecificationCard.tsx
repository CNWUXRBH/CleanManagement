import React from 'react';
import { Specification } from '../../../types/basicData';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Edit, Trash2, Settings } from 'lucide-react';

interface SpecificationCardProps {
  specification: Specification;
  onEdit: () => void;
  onDelete: () => void;
}

const SpecificationCard: React.FC<SpecificationCardProps> = ({
  specification,
  onEdit,
  onDelete
}) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{specification.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Settings className="w-4 h-4 mr-1" />
            <span>{specification.code}</span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          specification.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {specification.isActive ? '启用' : '禁用'}
        </span>
      </div>

      {specification.description && (
        <p className="text-sm text-gray-600 mb-4">{specification.description}</p>
      )}

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">规格属性</h4>
        <div className="space-y-2">
          {specification.attributes.map((attr, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">{attr.name}</span>
              <span className="text-gray-900">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>

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

export default SpecificationCard;