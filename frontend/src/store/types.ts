export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface UIState {
  isLoading: boolean;
  toast: Toast | null;
  setLoading: (loading: boolean) => void;
  showToast: (toast: Toast) => void;
  clearToast: () => void;
}

export interface InventoryState {
  // Add inventory state types here
}

export interface UserState {
  // Add user state types here
}

export type StoreState = UIState & InventoryState & UserState; 