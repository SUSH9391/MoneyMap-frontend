import { useQuery } from '@tanstack/react-query';
import { transactionApi } from '../api/endpoints/transactions';

export const useTransactions = (filters?: { categoryId?: string; startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionApi.getTransactions(filters),
  });
};