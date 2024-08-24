import { useQuery } from '@tanstack/react-query';

import apiClient from '../lib/api-client';
import API_ENDPOINT from '../lib/api-constants';
import { replaceUrl } from '../redux/constant/redux.constant';

// Assuming this is the axios instance

const fetchFriendList = async ({ queryKey }) => {
  const [, userId] = queryKey;
  const endPoint = replaceUrl(API_ENDPOINT.GET_FRIENDS_LIST, { userId });
  const response = await apiClient.get(endPoint); // Removed `params` since it was undefined
  return response.data.data; // Assuming response.data contains the list of friends
};

const useFetchFriendList = userId => {
  return useQuery({
    queryKey: ['fetchFriendList', userId],
    queryFn: fetchFriendList,
    enabled: !!userId, // Prevent the query from running if userId is undefined or null
    _optimisticResults: 'optimistic',
    onSuccess: () => {
      // toast.success('Friend list fetched successfully!');
      console.log('Friend list fetched successfully!');
    },
    onError: error => {
      toast.error(`Failed to fetch friend list: ${error.message}`);
    },
  });
};

export default useFetchFriendList;
