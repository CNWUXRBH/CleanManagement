import React from 'react';
import RequisitionList from '../components/requisition/RequisitionList';
import RequisitionHeader from '../components/requisition/RequisitionHeader';
import RequisitionStats from '../components/requisition/RequisitionStats';
import useRequisitions from '../hooks/requisition/useRequisitions';

const RequisitionPage: React.FC = () => {
  const { requisitions, isLoading, addRequisition } = useRequisitions();

  return (
    <div className="p-6">
      <RequisitionHeader onCreateNew={() => {}} />
      
      <div className="mb-6">
        <RequisitionStats requisitions={requisitions} />
      </div>

      <RequisitionList
        requisitions={requisitions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RequisitionPage;