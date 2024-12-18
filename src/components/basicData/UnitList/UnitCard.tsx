import React from 'react';
import { Unit } from '../../../types/basicData';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Edit, Trash2, Scale } from 'lucide-react';

interface UnitCardProps {
  unit: Unit;
  onEdit: () => void;
  onDelete: () => void;
}

const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  onEdit,
  onDelete
}) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Scale className="w-4 h-4 mr-1" />
            <span>{unit.code}</span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          unit.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {unit.isActive ? '启用' : '禁用'}
        </span>
      </div>

      {unit.description && (
        <p className="text-sm text-gray-600 mb-4">{unit.description}</p>
      )}

      {!unit.isBase && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            基本单位换算: 1{unit.name} = {unit.conversionRate}{unit.name}
          </p>
        </div>
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

export default UnitCard;