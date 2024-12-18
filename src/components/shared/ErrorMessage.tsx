import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title }) => {
  return (
    <div className="bg-red-50 p-4 rounded-md">
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium text-red-800">{title}</h3>
          )}
          <div className="text-sm text-red-700">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;