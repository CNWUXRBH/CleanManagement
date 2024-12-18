import React from 'react';
import { Specification } from '../../../types/basicData';
import SpecificationCard from './SpecificationCard';
import { Loader2 } from 'lucide-react';

interface SpecificationListProps {
  specifications: Specification[];
  isLoading: boolean;
  onEdit: (spec: Specification) => void;
  onDelete: (id: string) => void;
}

const SpecificationList: React.FC<SpecificationListProps> = ({
  specifications,
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
      {specifications.map((spec) => (
        <SpecificationCard
          key={spec.id}
          specification={spec}
          onEdit={() => onEdit(spec)}
          onDelete={() => onDelete(spec.id)}
        />
      ))}
    </div>
  );
};

export default SpecificationList;