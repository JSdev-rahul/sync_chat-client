import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { ToastMessageKey } from '@/constant';
import { useChatInterfaceContext } from '@/context/PageContext';
import { useOnMount } from '@/hooks/useOnMount';
import { useUserDetails } from '@/hooks/useUserDetails';
import { friendsAsyncThunk } from '@/redux/asyncThunk/friends.asyncThunk';

import { showErrorToast, showSuccessToast } from '../../../../utils/toaster';
import Logo from '../Logo';

import FriendRequestPage from './friendRequest';
import { FriendsList } from './friendsList';
import { Logout } from './logout';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const ContactContainer = React.memo(() => {
  const { setSelectedUser } = useChatInterfaceContext();

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

  const fetchUsers = () => {
    dispatch(friendsAsyncThunk.searchFriends({ params: searchUserParams }))
      .unwrap()
      .then(res => {
        const data = res.data.filter(item => item?.id != userId);
        setUsers(data);
      })
      .catch(err => {
        showErrorToast(err?.message);
      });
  };

  useEffect(() => {
    if (searchUserParams?.q?.length >= 1) {
      fetchUsers();
    }
  }, [searchUserParams]);

  const handleOnSearch = query => {
    setSearchUserParams({ ...searchUserParams, q: query });
  };

  const formatResult = data => {
    const { name, email, id = '' } = data;
    return (
     
      <div className="flex items-center justify-between">
        <div className="flex flex-col cursor-pointer">
          <span className="text-lg font-semibold">{name}</span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
        <div className="mr-4">
          <Button className="bg-slate-100 text-black hover:bg-slate-100 text-2xl hover:scale-110">
            +
          </Button>
        </div>
      </div>
    );
  };
  console.log('users', users);
  const handleOnSelect = item => {
    dispatch(friendsAsyncThunk.addFriend({ userId, friends: [item?.id] }))
      .unwrap()
      .then(() => {
        fetchFriendListHandler();
        showSuccessToast(ToastMessageKey.NEW_FRIEND_ADDED);
      })
      .catch(err => {
        console.log('err', err);
        showErrorToast(ToastMessageKey.FAILED_TO_ADD_USER_IN_FRIENDLIST);
      });
  };

  const fetchFriendListHandler = () => {
    dispatch(friendsAsyncThunk.fetchFriendsList({ friendListParams, userId }));
  };

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
            inputDebounce={300}
            maxResults={10}
            showItemsOnFocus={false}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            fuseOptions={{ keys: ['name','email'] }}
            placeholder="Search user by name or email"
            styling={{
              height: '38px',
              border: '1px solid darkgreen',
              borderRadius: '20px',
              backgroundColor: 'white',
              boxShadow: 'none',
              hoverBackgroundColor: 'none',
              color: 'darkgreen',
              fontSize: '16px',
              // fontFamily: "Courier",
              iconColor: 'black',
              lineColor: 'black',
              placeholderColor: 'black',
              clearIconMargin: '3px 8px 3px 0',
              zIndex: 0,
            }}
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
