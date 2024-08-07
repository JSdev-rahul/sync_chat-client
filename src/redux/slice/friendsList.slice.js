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
  reducers: {},
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

export default friendsListSlice.reducer;
