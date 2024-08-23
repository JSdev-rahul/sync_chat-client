import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FriendRequestType, ToastMessageKey } from '@/constant';
import { FriendListRequestContext } from '@/context/PageContext';
import { useUserDetails } from '@/hooks/useUserDetails';
import { friendRequestAsyncThunk } from '@/redux/asyncThunk/friendRequest.asyncThunk';
import { delay } from '@/utils/delay';

import { showErrorToast, showSuccessToast } from '../../../../../utils/toaster';

import PopoverDemo from './popOver';

const FriendRequestPage = ({ fetchFriendListHandler }) => {
  const dispatch = useDispatch();
  const { user } = useUserDetails();
  const userId = user?._id;

  const [isLoading, setIsLoading] = useState('');
  const [friendsRequests, setFriendRequests] = useState([]);

  const [friendRequestFilters, setFriendRequestFilters] = useState({
    status: FriendRequestType.PENDING,
  });

  const fetchFriendRequests = useCallback(() => {
    setIsLoading(true);
    dispatch(friendRequestAsyncThunk.fetchFriendRequest({ userId, friendRequestFilters }))
      .unwrap()
      .then(res => {
        setFriendRequests(res.data);
        showSuccessToast(ToastMessageKey.FRIEND_REQUEST_FETCHED);
      })
      .catch(err => {
        showErrorToast(err.message);
      })
      .finally(async () => {
        await delay(3000);
        setIsLoading(false);
      });
  }, [friendRequestFilters]);

  useEffect(() => {
    fetchFriendRequests();
  }, [friendRequestFilters]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      friendsRequests,
      friendRequestFilters,
      setFriendRequestFilters,
      fetchFriendRequests,
      fetchFriendListHandler,
    }),
    [isLoading, friendsRequests, friendRequestFilters],
  );

  return (
    <>
      <FriendListRequestContext.Provider value={contextValue}>
        <PopoverDemo />
      </FriendListRequestContext.Provider>
    </>
  );
};

export default FriendRequestPage;
