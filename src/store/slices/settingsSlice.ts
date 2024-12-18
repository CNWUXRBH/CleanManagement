import { StateCreator } from 'zustand';

interface Settings {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
  inventory: {
    lowStockThreshold: number;
    expiryWarningDays: number;
  };
}

export interface SettingsSlice {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  language: 'zh-CN',
  notifications: {
    enabled: true,
    sound: true,
    desktop: false,
  },
  inventory: {
    lowStockThreshold: 20,
    expiryWarningDays: 30,
  },
};

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  settings: defaultSettings,
  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),
});