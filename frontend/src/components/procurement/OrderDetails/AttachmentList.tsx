import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import Button from '../../shared/Button';

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface AttachmentListProps {
  attachments: Attachment[];
  onDownload: (attachment: Attachment) => void;
  onPreview: (attachment: Attachment) => void;
}

const AttachmentList: React.FC<AttachmentListProps> = ({
  attachments,
  onDownload,
  onPreview
}) => {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-900">附件</h4>
      <div className="border rounded-lg divide-y">
        {attachments.map((attachment) => (
          <div key={attachment.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                <p className="text-xs text-gray-500">{attachment.size}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                icon={<Eye className="w-4 h-4" />}
                onClick={() => onPreview(attachment)}
              >
                预览
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={() => onDownload(attachment)}
              >
                下载
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentList;