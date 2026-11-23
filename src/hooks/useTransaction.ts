import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  transactionApi,
  type CreateTransactionInput,
} from '../api/endpoints/transactions';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionInput) => transactionApi.createTransaction(data),
    onSuccess: () => {
      // Invalidate both transactions and budgets so charts & lists refresh automatically!
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};