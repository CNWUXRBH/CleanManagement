import React from 'react';
import { OrderComment } from '../../../types/procurement';
import { formatRelativeTime } from '../../../utils/date';
import { User, Paperclip } from 'lucide-react';

interface CommentListProps {
  comments: OrderComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无备注
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">用户 {comment.userId}</h4>
              <time className="text-sm text-gray-500">
                {formatRelativeTime(new Date(comment.timestamp))}
              </time>
            </div>
            <div className="text-sm text-gray-700">{comment.content}</div>
            {comment.attachments && comment.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {comment.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Paperclip className="w-4 h-4 mr-1" />
                    {attachment.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;