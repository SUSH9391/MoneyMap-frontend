
import { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function SplashScreen() {
  const router = useRouter();

  // Zustand selectors
  const hydrate = useAuthStore((state) => state.hydrate);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  // ---------------------------------------------
  // 1. Hydrate authentication state
  // ---------------------------------------------

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // ---------------------------------------------
  // 2. Navigate after hydration
  // ---------------------------------------------

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // ---------------------------------------------
  // 3. Splash UI
  // ---------------------------------------------

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900">

      <Text className="text-3xl font-bold text-brand-500 mb-4">
        LedgerNest
      </Text>

      <ActivityIndicator
        size="large"
        color="#7C6FF7"
      />

    </View>
  );
}
