import React from 'react';
import { OrderEvent } from '../../../types/procurement';
import { formatDate } from '../../../utils/date';
import { CheckCircle, XCircle, FileText, MessageSquare } from 'lucide-react';

interface ApprovalHistoryProps {
  events: OrderEvent[];
}

const ApprovalHistory: React.FC<ApprovalHistoryProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'commented':
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, index) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {index !== events.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>{getEventIcon(event.type)}</div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900">{event.description}</p>
                    {event.note && (
                      <p className="mt-1 text-sm text-gray-500">{event.note}</p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.timestamp}>
                      {formatDate(new Date(event.timestamp))}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovalHistory;