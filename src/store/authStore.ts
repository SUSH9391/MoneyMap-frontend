
// src/store/authStore.ts

import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

import type { StateStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

import type { User } from '@/types/auth';

// ---------------------------------------------
// 1. Types
// ---------------------------------------------

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  signIn: (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => void;

  signOut: () => void;

  updateTokens: (
    accessToken: string,
    refreshToken: string
  ) => void;

  hydrate: () => Promise<void>;
}

type PersistedAuthState = Pick<
  AuthState,
  'user' | 'accessToken' | 'refreshToken'
>;

// ---------------------------------------------
// 2. Secure Storage Adapter
// ---------------------------------------------

const secureStoreStorage: StateStorage = {
  getItem: async (key) => {
    return await SecureStore.getItemAsync(key);
  },

  setItem: async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  },

  removeItem: async (key) => {
    await SecureStore.deleteItemAsync(key);
  },
};

// ---------------------------------------------
// 3. Auth Store
// ---------------------------------------------

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,

      isAuthenticated: false,
      isLoading: true,

      // -----------------------------------------
      // Sign In
      // -----------------------------------------

      signIn: (accessToken, refreshToken, user) => {
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        });
      },

      // -----------------------------------------
      // Sign Out
      // -----------------------------------------

      signOut: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      // -----------------------------------------
      // Update Tokens
      // -----------------------------------------

      updateTokens: (accessToken, refreshToken) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      // -----------------------------------------
      // Hydrate Store
      // -----------------------------------------

      hydrate: async () => {
        try {
          set({ isLoading: true });

          await useAuthStore.persist.rehydrate();
        } catch (error) {
          console.error('Auth hydration failed:', error);

          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),

    // -------------------------------------------
    // Persistence Configuration
    // -------------------------------------------

    {
      name: 'auth-storage',

      storage: createJSONStorage<PersistedAuthState>(
        () => secureStoreStorage
      ),

      // Persist only authentication data
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),

      // Current storage version
      version: 2,

      // Manually hydrate during application startup
      skipHydration: true,

      // Handle hydration completion and errors
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate auth store:', error);

          useAuthStore.setState({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });

          return;
        }

        useAuthStore.setState({
          isAuthenticated: Boolean(state?.accessToken),
          isLoading: false,
        });
      },
    }
  )
);
