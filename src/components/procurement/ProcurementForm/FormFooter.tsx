import React from 'react';
import Button from '../../shared/Button';
import { Save, X } from 'lucide-react';

interface FormFooterProps {
  isValid: boolean;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({ isValid, onCancel, isSubmitting = false }) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="secondary"
        icon={<X className="w-4 h-4" />}
        onClick={onCancel}
        disabled={isSubmitting}
      >
        取消
      </Button>
      <Button
        type="submit"
        variant="primary"
        icon={<Save className="w-4 h-4" />}
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      >
        提交采购申请
      </Button>
    </div>
  );
};

export default FormFooter;