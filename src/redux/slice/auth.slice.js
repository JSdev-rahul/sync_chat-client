/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

import { authAsyncThunk } from "../asyncThunk/auth.asyncThunk";
import { RequestStatus } from "../constant/redux.constant";

const initialState = {
  status: RequestStatus.Idle,
  access_token: null,
  refresh_token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth/profile",
  initialState,
  reducers: {
    // handleLogoutReducer: (state) => {
    //   state.access_token = null
    //   state.refresh_token = null
    //   state.user = null
    //   state.status = RequestStatus.Pending
    //   localStorage.removeItem("persist:root")
    //   googleLogout()
    // },
    updateProfileReducer: (state, action) => {
      if (action?.payload) {
        state.user = action.payload.data;
      }
      return;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authAsyncThunk.loginAsyncThunk.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(
      authAsyncThunk.loginAsyncThunk.fulfilled,
      (state, action) => {
        console.log(action.payload);
        state.status = RequestStatus.Fulfilled;
        state.user = action.payload.data; // Access user property from payload
        state.access_token = action.payload.accessToken;
        state.refresh_token = action.payload.refreshToken;
      }
    );
    builder.addCase(authAsyncThunk.loginAsyncThunk.rejected, (state) => {
      state.status = RequestStatus.Rejected;
    });
  },
});

export const { updateProfileReducer } = authSlice.actions;
export default authSlice.reducer;
