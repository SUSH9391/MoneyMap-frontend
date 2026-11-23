import client from '../client';

export interface Budget {
  id: string;
  name: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  progress: {
    spent: number;
    remaining: number;
    percentage: number;
  };
  category: {
    id: string;
    name: string;
    color?: string;
  };
}

export interface CreateBudgetInput {
  name: string;
  amount: number;
  categoryId: string;
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: string;
}

export const budgetApi = {
  getBudgets: async (): Promise<Budget[]> => {
    const res = await client.get('/budgets');
    return res.data.data;
  },

  createBudget: async (input: CreateBudgetInput): Promise<Budget> => {
    const res = await client.post('/budgets', input);
    return res.data.data;
  },
};