import * as SecureStore from 'expo-secure-store';
import type { StateStorage } from 'zustand/middleware';

/**
 * Zustand StateStorage backed by expo-secure-store with defensive error handling
 * so corrupted keystore entries or transient storage errors never crash hydration.
 */
export const secureStoreStorage: StateStorage = {
  getItem: async (name: string) => {
    try {
      const value = await SecureStore.getItemAsync(name);
      return value ?? null;
    } catch (error) {
      console.warn(`Failed to read "${name}" from SecureStore:`, error);
      try {
        await SecureStore.deleteItemAsync(name);
      } catch {
        // Ignore cleanup errors
      }
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.warn(`Failed to write "${name}" to SecureStore:`, error);
    }
  },
  removeItem: async (name: string) => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.warn(`Failed to delete "${name}" from SecureStore:`, error);
    }
  },
};
