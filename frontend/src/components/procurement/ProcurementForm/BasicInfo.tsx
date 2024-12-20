import React from 'react';
import { generateOrderNumber } from '../../../utils/procurement/orderNumberGenerator';

interface BasicInfoProps {
  department: string;
  onDepartmentChange: (department: string) => void;
  error?: string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  department,
  onDepartmentChange,
  error
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">采购单号</label>
        <input
          type="text"
          value={generateOrderNumber()}
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 
            shadow-sm sm:text-sm"
          disabled
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">申请部门</label>
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          required
        >
          <option value="">选择部门</option>
          <option value="清洁部">清洁部</option>
          <option value="后勤部">后勤部</option>
          <option value="工程部">工程部</option>
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default BasicInfo;