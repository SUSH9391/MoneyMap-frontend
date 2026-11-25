import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStoreStorage } from './secureStorage';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeState {
    preference: ThemePreference;
    _hasHydrated: boolean;
    setPreference: (preference: ThemePreference) => void;
    _setHasHydrated: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            preference: 'system',
            _hasHydrated: false,
            setPreference: (preference) => set({ preference }),
            _setHasHydrated: (value) => set({ _hasHydrated: value }),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => secureStoreStorage),
            onRehydrateStorage: () => (state) => {
                state?._setHasHydrated(true);
            },
        }
    )
);
