import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { friendsAsyncThunk } from "@/redux/asyncThunk/friends.asyncThunk";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Button } from "@/components/ui/button";
import showToast from "../../../../../utils/toaster";
import FriendRequestPage from "../friendRequest";

const ContactContainer = React.memo(({ setSelectedUser }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { friendsList } = useSelector((state) => state.friendsList);

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const [searchUserParams, setSearchUserParams] = useState({
    q: "",
    limit: 10,
  });

  const getFriendsListHandler = () => {
    dispatch(
      friendsAsyncThunk.fetchFriendsList({
        params,
        userId: user?._id,
      })
    );
  };

  const searchUsersHandler = () => {
    dispatch(
      friendsAsyncThunk.searchFriends({
        params: searchUserParams,
      })
    )
      .unwrap()
      .then((res) => {
        // Format users data for ReactSearchAutocomplete
        const data = res?.data?.filter((item) => item?.id != user?._id);
        setUsers(data);
      })
      .catch(() => {
        console.log("err");
      });
  };

  useEffect(() => {
    getFriendsListHandler();
  }, []);

  useEffect(() => {
    if (searchUserParams.q.length > 0) {
      searchUsersHandler();
    }
  }, [searchUserParams]);

  const handleOnSearch = (string, results) => {
    setSearchUserParams({
      ...searchUserParams,
      q: string,
    });

    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  // Trigger the search when the debounced value changes
  const formatResult = (user) => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col cursor-pointer">
          <span className="text-lg font-semibold">
            {user.name} {user.lname}
          </span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>
        <div className="mr-4">
          <Button className="bg-slate-100 text-black hover:bg-slate-100 text-2xl hover:scale-110">
            +
          </Button>
        </div>
      </div>
    );
  };

  const handleOnSelect = (item) => {
    // the item selected
    dispatch(
      friendsAsyncThunk.addFriend({ userId: user?._id, friends: [item?.id] })
    )
      .unwrap()
      .then((res) => {
        // Assuming getFriendsListHandler is defined in the component
        getFriendsListHandler(); // Refresh the friends list
        showToast({
          type: "success",
          message: `Friend added successfully: ${item.name}`,
        });
      })
      .catch((err) => {
        showToast({
          type: "error",
          message: "Failed to add friend. Please try again.",
        });
        console.error("Error adding friend:", err);
      });
  };
  return (
    <div className="text-white text-opacity-90 border-b-2 p-4 flex flex-col">
      
      <div className="w-80 mb-7">
        <ReactSearchAutocomplete
          className=""
          items={users}
          styling={{
            fontSize: "16px", // Font size for the result text
            inputFontSize: "20px", // Font size for the input field text
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
      {friendsList?.map((contact) => {
        const { friendDetails } = contact;
        return (
          <div
            key={friendDetails.id}
            className="flex items-center mb-4 gap-5 cursor-pointer"
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
              <div className="text-lg font-semibold">
                {" "}
                {friendDetails?.firstName[0].toUpperCase()}
                {friendDetails?.lastName[0].toUpperCase()}
              </div>
            </div>
            <div onClick={() => setSelectedUser(friendDetails)}>
              <div className="font-semibold">
                {friendDetails?.firstName} {friendDetails?.lastName}
              </div>
              <div className="text-sm text-gray-400">
                {friendDetails?.lastSeen}
              </div>
              <div className="text-sm text-gray-400">
                {friendDetails?.email}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default React.memo(ContactContainer);
