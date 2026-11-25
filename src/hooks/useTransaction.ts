import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionApi, type CreateTransactionInput } from '@/api/endpoints/transactions';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionInput) => transactionApi.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};
