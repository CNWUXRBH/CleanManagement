import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './utils';
import type { StoreState } from './types';

const useStoreBase = create<StoreState>()(
  devtools(
    (set) => ({
      isLoading: false,
      toast: null,
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      showToast: (toast) => set({ toast }),
      clearToast: () => set({ toast: null }),
    }),
    { name: 'CleanManagement' }
  )
);

const useStore = createSelectors(useStoreBase);

export default useStore; 