import React from 'react';
import { MovementSummary } from '../../../types/inventory';
import { ArrowDownCircle, ArrowUpCircle, Scale } from 'lucide-react';

interface MovementSummaryProps {
  summary: MovementSummary;
}

const MovementSummary: React.FC<MovementSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg">
            <ArrowDownCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">总入库量</p>
            <p className="text-2xl font-semibold text-gray-900">{summary.totalIn}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-red-50 rounded-lg">
            <ArrowUpCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">总出库量</p>
            <p className="text-2xl font-semibold text-gray-900">{summary.totalOut}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Scale className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">净变动</p>
            <p className="text-2xl font-semibold text-gray-900">{summary.balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementSummary;