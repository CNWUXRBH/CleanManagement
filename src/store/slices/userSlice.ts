import { StateCreator } from 'zustand';

interface User {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface UserSlice {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
  hasPermission: (permission) => {
    const { user } = get();
    return user?.permissions.includes(permission) || false;
  },
});