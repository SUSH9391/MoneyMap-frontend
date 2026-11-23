import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetApi, CreateBudgetInput } from '../api/endpoints/budgets';

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: budgetApi.getBudgets,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetInput) => budgetApi.createBudget(data),
    onSuccess: () => {
      // Invalidate and refetch budgets automatically!
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};