import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  sharedItemsApi,
  type AcceptSharedItemRequest,
} from '@/api/endpoints/sharedItems';

export const useSharedInbox = () =>
  useQuery({
    queryKey: ['shared-items', 'inbox'],
    queryFn: sharedItemsApi.getInbox,
  });

export const useSharedSent = () =>
  useQuery({
    queryKey: ['shared-items', 'sent'],
    queryFn: sharedItemsApi.getSent,
  });

export const useAcceptSharedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AcceptSharedItemRequest }) =>
      sharedItemsApi.accept(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shared-items'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useRejectSharedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sharedItemsApi.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shared-items'] });
    },
  });
};
