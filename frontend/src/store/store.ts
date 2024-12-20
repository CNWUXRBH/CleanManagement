import { create } from 'zustand';

// Define the store state type
export interface StoreState {
  // UI State
  isLoading: boolean;
  toast: { type: 'success' | 'error' | 'warning' | 'info'; message: string; } | null;
  setLoading: (loading: boolean) => void;
  showToast: (toast: { type: 'success' | 'error' | 'warning' | 'info'; message: string; }) => void;
  clearToast: () => void;
}

// Create the store
const useStore = create<StoreState>((set) => ({
  // UI State
  isLoading: false,
  toast: null,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));

export default useStore; 