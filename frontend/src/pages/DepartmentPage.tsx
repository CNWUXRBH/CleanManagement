import React from 'react';
import DepartmentHeader from '../components/department/DepartmentHeader';
import DepartmentList from '../components/department/DepartmentList';
import DepartmentStats from '../components/department/DepartmentStats';
import { useDepartments } from '../hooks/department/useDepartments';

const DepartmentPage: React.FC = () => {
  const { departments, isLoading } = useDepartments();

  return (
    <div className="p-6">
      <DepartmentHeader />
      
      <div className="mb-6">
        <DepartmentStats departments={departments} />
      </div>

      <DepartmentList departments={departments} isLoading={isLoading} />
    </div>
  );
};

export default DepartmentPage;