import { FriendRequestType } from '@/constant';
import apiClient from '@/lib/api-client';
import API_ENDPOINT from '@/lib/api-constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useOnUpdateFriendRequestStatus from './useOnUpdateFriendRequestStatus';

const onAcceptFriendRequestHandler = async ({ userId, friends: [friendId] }) => {
  const payload = { userId, friends: [friendId] };
  console.log(payload);
  const response = await apiClient.post(API_ENDPOINT.ACCEPT_FRIEND_REQUEST, payload);
  return response.data;
};

export const useOnAcceptFriendRequest = () => {
  const { mutate: onUpdateMutate } = useOnUpdateFriendRequestStatus();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: onAcceptFriendRequestHandler,
    onSuccess: (_, variables) => {
      const { friendRequestId } = variables;
      if (friendRequestId) {
        onUpdateMutate({ friendRequestId, status: FriendRequestType.ACCEPTED });
      }
      queryClient.invalidateQueries(['fetchFriendRequests', 'fetchFriendList']);
    },
  });
};
