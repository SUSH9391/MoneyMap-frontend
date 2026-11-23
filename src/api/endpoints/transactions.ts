import client from '../client';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
  category?: {
    id: string;
    name: string;
    color?: string;
    icon?: string;
  };
}

export const transactionApi = {
  getTransactions: async (params?: { categoryId?: string; startDate?: string; endDate?: string }): Promise<Transaction[]> => {
    const res = await client.get('/transactions', { params });
    return res.data.data;
  },
};