import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { authApi } from '../api/endpoints/auth';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signIn = useAuthStore((s) => s.signIn);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      await signIn(data.accessToken, data.refreshToken, data.user);
      queryClient.setQueryData(['user'], data.user);
      router.replace('/(tabs)');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOut = useAuthStore((s) => s.signOut);

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: async () => {
      await signOut();
      queryClient.clear();
      router.replace('/(auth)/login');
    },
  });
};