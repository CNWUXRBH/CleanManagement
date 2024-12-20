import { StateCreator } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  avatar?: string;
}

export interface UserSlice {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        error: (error as Error).message,
        loading: false,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      // TODO: Replace with actual API call
      await fetch('/api/auth/logout', { method: 'POST' });
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      set({
        error: (error as Error).message,
        loading: false,
      });
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedUser = await response.json();
      set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null,
        loading: false,
      }));
    } catch (error) {
      set({
        error: (error as Error).message,
        loading: false,
      });
    }
  },
});