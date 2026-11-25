import client from '@/api/client';
import type { ApiResponse } from '@/api/endpoints/auth';
import type { PublicUser } from '@/api/endpoints/users';

export type SharedItemStatus = 'pending' | 'accepted' | 'rejected';

export interface SharedItem {
  id: string;
  status: SharedItemStatus;
  splitAmount: string;
  sharedBy?: PublicUser | null;
  sharedWith?: PublicUser | null;
  receiptItem: {
    id: string;
    name: string;
    receipt: {
      id: string;
      storeName: string | null;
      receiptDate: string;
    };
  };
}

export interface AcceptSharedItemRequest {
  categoryId: string;
}

export const sharedItemsApi = {
  getInbox: async (): Promise<SharedItem[]> => {
    const response = await client.get<ApiResponse<SharedItem[]>>('/shared-items/inbox');
    return response.data.data;
  },
  getSent: async (): Promise<SharedItem[]> => {
    const response = await client.get<ApiResponse<SharedItem[]>>('/shared-items/sent');
    return response.data.data;
  },
  accept: async (id: string, data: AcceptSharedItemRequest): Promise<SharedItem> => {
    const response = await client.post<ApiResponse<SharedItem>>(`/shared-items/${id}/accept`, data);
    return response.data.data;
  },
  reject: async (id: string): Promise<void> => {
    await client.post(`/shared-items/${id}/reject`);
  },
};
