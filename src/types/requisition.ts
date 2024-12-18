export interface RequisitionItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Requisition {
  id: string;
  requisitionNumber: string;
  requestDate: string;
  department: string;
  items: RequisitionItem[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requesterId: string;
  approverId?: string;
  approvalDate?: string;
  note?: string;
}