import apiClient from '@/lib/api-client';
import API_ENDPOINT from '@/lib/api-constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddFrinedFn = async ({ payload }) => {
  const response = await apiClient.post(API_ENDPOINT.ADD_FRIEND, payload);
  return response.data; // Assuming response.data contains the updated friends list
};

export const useAddFriendMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useAddFrinedFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchFriendList']);
    },
  });
};
