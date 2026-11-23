// src/api/client.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// ─── 401 Refresh Mutex Queue ────────────────────────────────────────────────
let isRefreshing = false;
type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void };
let refreshQueue: QueueEntry[] = [];

const processQueue = (error: unknown, newAccessToken: string | null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(newAccessToken!);
    }
  });
  refreshQueue = [];
};

// ─── Axios Instance ─────────────────────────────────────────────────────────
const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor: Attach Bearer Token ──────────────────────────────
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ─── Response Interceptor: 401 Refresh & Replay ────────────────────────────
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig: InternalAxiosRequestConfig & { _retry?: boolean } = error?.config ?? {};

    const is401 = error?.response?.status === 401;
    const isRefreshEndpoint = originalConfig?.url?.includes('/auth/refresh');
    const skipRefresh = (originalConfig as any)?.skipAuthRefresh === true;

    if (is401 && !originalConfig._retry && !isRefreshEndpoint && !skipRefresh) {
      originalConfig._retry = true;

      // If a refresh is already happening, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (newAccessToken: string) => {
              originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
              resolve(client(originalConfig));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      const { refreshToken, signOut, updateTokens } = useAuthStore.getState();

      if (!refreshToken) {
        isRefreshing = false;
        processQueue(new Error('No refresh token available'), null);
        await signOut();
        return Promise.reject(error);
      }

      try {
        // Exchange refresh token for fresh pair
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // Save fresh tokens to Zustand + SecureStore
        updateTokens(newAccessToken, newRefreshToken);

        // Replay original request
        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

        // Replay all waiting queued requests
        processQueue(null, newAccessToken);

        return client(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await signOut();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;