import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';
import API_ENDPOINT from '../lib/api-constants';
import { replaceUrl } from '@/redux/constant/redux.constant';


// Function to update friend request status
const updateFriendRequestStatus = async ({ friendRequestId, status }) => {
  const endPoint = replaceUrl(API_ENDPOINT.UPDATE_FRIEND_REQUEST_STATUS, { friendRequestId });
  const response = await apiClient.patch(endPoint, { status });
  return response.data; // Assuming response.data contains the updated friend request details
};

// Custom hook to handle the mutation
const useOnUpdateFriendRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFriendRequestStatus,
    onSuccess: () => {
      // Optionally refetch friend requests or any other related data
      queryClient.invalidateQueries(['fetchFriendRequests'])
    //   showSuccessToast(ToastMessageKey.FRIEND_REQUEST_STATUS_UPDATED);
    },
    onError: () => {
    //   showErrorToast(ToastMessageKey.FAILED_TO_UPDATE_FRIEND_REQUEST);
    },
  });
};

export default useOnUpdateFriendRequestStatus;
