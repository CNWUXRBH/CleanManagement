import React from 'react';
import { Unit } from '../../../types/basicData';
import UnitCard from './UnitCard';
import { Loader2 } from 'lucide-react';

interface UnitListProps {
  units: Unit[];
  isLoading: boolean;
  onEdit: (unit: Unit) => void;
  onDelete: (id: string) => void;
}

const UnitList: React.FC<UnitListProps> = ({
  units,
  isLoading,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map((unit) => (
        <UnitCard
          key={unit.id}
          unit={unit}
          onEdit={() => onEdit(unit)}
          onDelete={() => onDelete(unit.id)}
        />
      ))}
    </div>
  );
};

export default UnitList;