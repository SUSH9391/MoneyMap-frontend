import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStoreStorage } from './secureStorage';

export interface CurrencyOption {
    code: string;
    symbol: string;
    label: string;
}

export const CURRENCIES: CurrencyOption[] = [
    { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit' },
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
    { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
];

interface SettingsState {
    currency: CurrencyOption;
    setCurrency: (currency: CurrencyOption) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            currency: CURRENCIES[0], // default RM
            setCurrency: (currency) => set({ currency }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => secureStoreStorage),
        }
    )
);
