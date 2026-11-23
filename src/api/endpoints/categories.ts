import client from '../client';

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await client.get<{ data: Category[] }>('/categories');
    return response.data.data;
  },
};
