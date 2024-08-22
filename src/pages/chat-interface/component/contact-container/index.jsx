import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { Button } from '@/components/ui/button';
import { ToastMessageKey } from '@/constant';
import { useOnMount } from '@/hooks/useOnMount';
import { useUserDetails } from '@/hooks/useUserDetails';
import { friendsAsyncThunk } from '@/redux/asyncThunk/friends.asyncThunk';

import { showErrorToast, showSuccessToast } from '../../../../utils/toaster';
import Logo from '../Logo';

import FriendRequestPage from './friendRequest';
import { FriendsList } from './friendsList';
import { Logout } from './logout';

const ContactContainer = React.memo(({ setSelectedUser }) => {
  const dispatch = useDispatch();
  const { user } = useUserDetails();
  const userId = user?._id;
  const [users, setUsers] = useState([]);

  const [friendListParams, setFriendListParams] = useState({
    page: 1,
    limit: 5,
  });
  const [searchUserParams, setSearchUserParams] = useState({
    q: '',
    limit: 10,
  });

  const fetchUsers = useCallback(() => {
    dispatch(friendsAsyncThunk.searchFriends({ params: searchUserParams }))
      .unwrap()
      .then(res => {
        const data = res.data.filter(item => item.id != userId);
        setUsers(data);
      })
      .catch(err => {
        showErrorToast(err?.message);
      });
  }, [searchUserParams, userId]);

  useEffect(() => {
    if (searchUserParams.q) {
      fetchUsers();
    }
  }, [searchUserParams.q]);

  const handleOnSearch = useCallback(query => {
    setSearchUserParams({ ...searchUserParams, q: query });
  }, []);

  const formatResult = useCallback(data => {
    const { name, lname, email = '' } = data;
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col cursor-pointer">
          <span className="text-lg font-semibold">
            {name} {lname}
          </span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
        <div className="mr-4">
          <Button className="bg-slate-100 text-black hover:bg-slate-100 text-2xl hover:scale-110">
            +
          </Button>
        </div>
      </div>
    );
  }, []);

  const handleOnSelect = useCallback(
    item => {
      dispatch(friendsAsyncThunk.addFriend({ userId, friends: [item?.id] }))
        .unwrap()
        .then(() => {
          fetchFriendListHandler();
          showSuccessToast(ToastMessageKey.NEW_FRIEND_ADDED);
        })
        .catch(() => {
          showErrorToast(ToastMessageKey.FAILED_TO_ADD_USER_IN_FRIENDLIST);
        });
    },
    [dispatch, userId],
  );

  const fetchFriendListHandler = useCallback(() => {
    dispatch(friendsAsyncThunk.fetchFriendsList({ friendListParams, userId }));
  }, [userId, dispatch]);

  useOnMount(() => {
    fetchFriendListHandler();
  });

  return (
    <>
      <div className="text-white text-opacity-90 border-b-2 p-4 flex flex-col">
        <Logo />
        <div className="flex flex-col justify-center">
          <h2 className="text-white flex justify-between text-lg font-semibold mb-4 mt-6  items-center space-x-4">
            <span># My Contacts</span>
            <FriendRequestPage fetchFriendListHandler={fetchFriendListHandler} />
          </h2>
          <span className="text-gray-300">{user?.email}</span>
        </div>
        <div className="w-80 my-4">
          <ReactSearchAutocomplete
            items={users}
            styling={{
              fontSize: '16px', // Font size for the result text
              inputFontSize: '20px', // Font size for the input field text
            }}
            inputDebounce={300}
            maxResults={10}
            showItemsOnFocus={false}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            placeholder="Search user by name or email"
          />
        </div>
        <FriendsList setSelectedUser={setSelectedUser} />

        <div>
          <Logout />
        </div>
      </div>
    </>
  );
});

export default React.memo(ContactContainer);
