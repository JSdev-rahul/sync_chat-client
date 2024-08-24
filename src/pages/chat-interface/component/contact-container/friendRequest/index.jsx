import { useMemo, useState } from 'react';

import { FriendRequestType } from '@/constant';
import { FriendListRequestContext } from '@/context/PageContext';
import { useUserDetails } from '@/hooks/useUserDetails';
import useFetchFriendRequest from '@/queries/useFetchFriendRequest';
import FriendRequestPopover from './friendRequestPopover';


const FriendRequestPage = () => {
  const { userId } = useUserDetails();

  const [friendRequestFilters, setFriendRequestFilters] = useState({
    status: FriendRequestType.PENDING,
  });

  const { isLoading, data: friendsRequests, refetch: refetchFriendRequests } = useFetchFriendRequest(userId, friendRequestFilters);

  const contextValue = useMemo(
    () => ({
      isLoading,
      friendsRequests,
      setFriendRequestFilters,
      friendRequestFilters,
      refetchFriendRequests,
    }),
    [friendsRequests],
  );

  return (
    <>
      <FriendListRequestContext.Provider value={contextValue}>
        <FriendRequestPopover />
      </FriendListRequestContext.Provider>
    </>
  );
};

export default FriendRequestPage;
