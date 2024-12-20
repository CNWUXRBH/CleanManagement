export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export interface Item {
  id: string;
  code: string;
  name: string;
  category: string;
  specification: string;
  unit: string;
  minStock: number;
  currentStock: number;
  supplierId: string;
  price: number;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  contactNumber: string;
}

export interface ProcurementOrder {
  id: string;
  orderNumber: string;
  requestDate: string;
  department: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  items: ProcurementItem[];
}

export interface ProcurementItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}