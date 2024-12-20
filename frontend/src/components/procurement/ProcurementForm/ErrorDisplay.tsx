import React from 'react';
import { ValidationError } from '../../../utils/procurement/orderValidation';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  errors: ValidationError[];
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 p-4 rounded-md">
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            表单验证错误
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;