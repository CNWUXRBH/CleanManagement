import { StateCreator } from 'zustand';
import { UIState, StoreState } from './types';

export const createUISlice: StateCreator<
  StoreState,
  [],
  [],
  UIState
> = (set) => ({
  isLoading: false,
  toast: null,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}); 