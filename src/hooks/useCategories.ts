import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../api/endpoints/categories';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories,
  });
};
