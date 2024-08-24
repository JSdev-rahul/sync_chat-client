import { useQuery } from '@tanstack/react-query';

import apiClient from '../lib/api-client';
import API_ENDPOINT from '../lib/api-constants';
import { replaceUrl } from '../redux/constant/redux.constant';

// Assuming this is the axios instance

const fetchFriendRequest = async ({ queryKey }) => {
  const [, userId, friendRequestFilters] = queryKey;
  const params = friendRequestFilters;
  const endPoint = replaceUrl(API_ENDPOINT.GET_ALL_FRIEND_REQUEST, { userId });
  const response = await apiClient.get(endPoint, { params });
  return response.data.data; // Assuming response.data contains the list of friends
};

const useFetchFriendRequest = (userId, friendRequestFilters) => {
  return useQuery({
    queryKey: ['fetchFriendRequest', userId, friendRequestFilters],
    queryFn: fetchFriendRequest,
    enabled: !!userId, // Prevent the query from running if userId is undefined or null
    _optimisticResults: 'isRestoring',
    onSuccess: () => {
      // toast.success('Friend list fetched successfully!');
      console.log('Friend list fetched successfully!');
    },
    onError: error => {
      toast.error(`Failed to fetch friend list: ${error.message}`);
    },
  });
};

export default useFetchFriendRequest;
