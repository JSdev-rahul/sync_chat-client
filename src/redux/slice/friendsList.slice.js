/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../constant/redux.constant";
import { friendsAsyncThunk } from "../asyncThunk/friends.asyncThunk";

const initialState = {
  status: RequestStatus.Idle,
  friendsList: null,
};

const friendsListSlice = createSlice({
  name: "friends/friendsList",
  initialState,
  reducers: {
    updateFriendStatus: (state, action) => {
      console.log("action", action);

      if (action?.payload) {
        const { userId, isOnline, lastSeen } = action.payload; // Extract necessary data from payload

        // Update the friends list
        const updatedData = state.friendsList.map((item) => {
          if (item.friendDetails._id === userId) {
            // Update the friendDetails object with the new isOnline status
            return {
              ...item,
              friendDetails: {
                ...item.friendDetails,
                isOnline: isOnline,
                lastSeen: lastSeen && lastSeen,
              },
            };
          } else {
            return item;
          }
        });

        // Update the state with the new friends list
        state.friendsList = updatedData;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(friendsAsyncThunk.fetchFriendsList.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(
      friendsAsyncThunk.fetchFriendsList.fulfilled,
      (state, action) => {
        console.log(action.payload.data);
        state.status = RequestStatus.Fulfilled;
        state.friendsList = action.payload.data; // Access user property from payload
      }
    );
    builder.addCase(friendsAsyncThunk.fetchFriendsList.rejected, (state) => {
      state.status = RequestStatus.Rejected;
    });
  },
});
export const { updateFriendStatus } = friendsListSlice.actions;
export default friendsListSlice.reducer;
