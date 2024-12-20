import React from 'react';
import { Department } from '../../types';
import DepartmentCard from './DepartmentCard';
import { Loader2 } from 'lucide-react';

interface DepartmentListProps {
  departments: Department[];
  isLoading: boolean;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  );
};

export default DepartmentList;