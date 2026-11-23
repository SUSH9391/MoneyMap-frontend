import client from '../client';
import { User } from '../../types/auth';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await client.post('/auth/login', credentials);
    return res.data.data;
  },

  register: async (data: { email: string; password: string; firstName?: string; lastName?: string }): Promise<AuthResponse> => {
    const res = await client.post('/auth/register', data);
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
  },
};