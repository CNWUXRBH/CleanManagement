import React, { useState } from 'react';
import Button from '../../shared/Button';
import { Send, Paperclip } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (content: string, attachments: File[]) => void;
  isSubmitting?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, attachments);
      setContent('');
      setAttachments([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 
            focus:ring-blue-500 sm:text-sm"
          rows={3}
          placeholder="添加备注..."
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
          <label
            htmlFor="file-upload"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 
              cursor-pointer"
          >
            <Paperclip className="w-4 h-4 mr-1" />
            添加附件
          </label>
          {attachments.length > 0 && (
            <span className="ml-2 text-sm text-gray-500">
              已选择 {attachments.length} 个文件
            </span>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          icon={<Send className="w-4 h-4" />}
          disabled={!content.trim() || isSubmitting}
          isLoading={isSubmitting}
        >
          发送
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;