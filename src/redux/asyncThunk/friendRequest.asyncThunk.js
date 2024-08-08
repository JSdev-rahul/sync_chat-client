import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../../utils/api-client";
import API_ENDPOINT from "../../../utils/api-constants";
import { replaceUrl } from "../constant/redux.constant";

class FriendRequestAsyncThunk {
  // Fetch friends list with pagination
  fetchFriendRequest = createAsyncThunk(
    "friendRequest/fetchList",
    async (payload, { rejectWithValue }) => {
      const { userId, params } = payload;
      try {
        const endPoint = replaceUrl(API_ENDPOINT.GET_ALL_FRIEND_REQUEST, {
          userId,
        });
        const response = await ApiClient.get(endPoint, { params });
        return response.data; // Assuming response.data contains the list of friends
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  updateFriendRequestStatus = createAsyncThunk(
    "friendRequest/updateStatus",
    async (payload, { rejectWithValue }) => {
      const { friendRequestId,status } = payload;
      
      try {
        const endPoint = replaceUrl(API_ENDPOINT.UPDATE_FRIEND_REQUEST_STATUS, {
          friendRequestId,
        });
        const response = await ApiClient.patch(endPoint, {status});
        return response.data; // Assuming response.data contains the updated request information
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  // Search for friends based on a query

  // Add a new friend
}

export const friendRequestAsyncThunk = new FriendRequestAsyncThunk();
