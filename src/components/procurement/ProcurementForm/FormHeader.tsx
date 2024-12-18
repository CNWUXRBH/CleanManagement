import React from 'react';
import { generateOrderNumber } from '../../../utils/procurement/orderNumberGenerator';

interface FormHeaderProps {
  department: string;
  onDepartmentChange: (department: string) => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ department, onDepartmentChange }) => {
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option value="">选择部门</option>
          <option value="清洁部">清洁部</option>
          <option value="后勤部">后勤部</option>
          <option value="工程部">工程部</option>
        </select>
      </div>
    </div>
  );
};

export default FormHeader;