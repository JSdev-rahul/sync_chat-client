import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FriendRequestType, ToastMessageKey } from '@/constant';
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

  const [params, setParams] = useState({ status: FriendRequestType.PENDING });

  const fetchFriendRequests = useCallback(() => {
    setIsLoading(true);
    dispatch(friendRequestAsyncThunk.fetchFriendRequest({ userId, params }))
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
  }, [params]);

  useEffect(() => {
    fetchFriendRequests();
  }, [params]);

  return (
    <>
      <PopoverDemo
        isLoading={isLoading}
        friendsRequests={friendsRequests}
        status={params.status}
        setParams={setParams}
        fetchFriendRequests={fetchFriendRequests}
        fetchFriendListHandler={fetchFriendListHandler}
      />
    </>
  );
};

export default FriendRequestPage;
