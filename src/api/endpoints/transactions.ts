import client from '../client';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface TransactionCategory {
  id: string;
  name: string;
  color?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  description: string;
  date: string;
  category?: TransactionCategory;
  receiptId?: string;
  receiptItem?: unknown;
}

export interface TransactionFilters {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateTransactionInput {
  amount: number;
  type: 'expense' | 'income';
  description: string;
  categoryId: string;
  date?: string;
}

export const transactionApi = {
  getTransactions: async (filters: TransactionFilters = {}): Promise<Transaction[]> => {
    const response = await client.get<ApiResponse<Transaction[]>>('/transactions', { params: filters });
    return response.data.data;
  },

  createTransaction: async (data: CreateTransactionInput): Promise<Transaction> => {
    const response = await client.post<ApiResponse<Transaction>>('/transactions', data);
    return response.data.data;
  },
};