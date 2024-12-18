import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'app-storage',
    }
  )
);

export default useStore;