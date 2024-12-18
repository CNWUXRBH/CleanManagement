import React, { useState } from 'react';
import Button from '../../shared/Button';
import { CheckCircle, XCircle } from 'lucide-react';

interface ApprovalFormProps {
  onApprove: (note: string) => Promise<void>;
  onReject: (note: string) => Promise<void>;
  isProcessing?: boolean;
}

const ApprovalForm: React.FC<ApprovalFormProps> = ({
  onApprove,
  onReject,
  isProcessing = false
}) => {
  const [note, setNote] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!action) return;

    try {
      if (action === 'approve') {
        await onApprove(note);
      } else {
        await onReject(note);
      }
      setNote('');
      setAction(null);
    } catch (error) {
      console.error('Error processing approval:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          审批意见
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="请输入审批意见..."
          disabled={isProcessing}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="danger"
          icon={<XCircle className="w-4 h-4" />}
          onClick={() => setAction('reject')}
          disabled={isProcessing}
        >
          拒绝
        </Button>
        <Button
          type="button"
          variant="primary"
          icon={<CheckCircle className="w-4 h-4" />}
          onClick={() => setAction('approve')}
          disabled={isProcessing}
          isLoading={isProcessing && action === 'approve'}
        >
          批准
        </Button>
      </div>
    </form>
  );
};

export default ApprovalForm;