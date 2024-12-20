export interface OrderEvent {
  id: string;
  type: 'created' | 'approved' | 'rejected' | 'commented' | 'modified';
  description: string;
  timestamp: string;
  userId: string;
  note?: string;
}

export interface OrderComment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
}

export interface OrderNotification {
  id: string;
  orderId: string;
  type: 'approval' | 'rejection' | 'comment' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId: string;
}