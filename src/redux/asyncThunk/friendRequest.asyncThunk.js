import { createAsyncThunk } from '@reduxjs/toolkit';

import apiClient from '../../lib/api-client';
import API_ENDPOINT from '../../lib/api-constants';
import { replaceUrl } from '../constant/redux.constant';

class FriendRequestAsyncThunk {
  // Fetch friends list with pagination
  fetchFriendRequest = createAsyncThunk(
    'friendRequest/fetchList',
    async (payload, { rejectWithValue }) => {
      const { userId, params } = payload;
      try {
        const endPoint = replaceUrl(API_ENDPOINT.GET_ALL_FRIEND_REQUEST, {
          userId,
        });
        const response = await apiClient.get(endPoint, { params });
        return response.data; // Assuming response.data contains the list of friends
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );
  updateFriendRequestStatus = createAsyncThunk(
    'friendRequest/updateStatus',
    async (payload, { rejectWithValue }) => {
      const { friendRequestId, status } = payload;

      try {
        const endPoint = replaceUrl(API_ENDPOINT.UPDATE_FRIEND_REQUEST_STATUS, {
          friendRequestId,
        });
        const response = await apiClient.patch(endPoint, { status });
        return response.data; // Assuming response.data contains the updated request information
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );
  acceptFriendRequest = createAsyncThunk(
    'friendRequest/accept',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await apiClient.post(API_ENDPOINT.ACCEPT_FRIEND_REQUEST, payload);
        return response.data; // Assuming response.data contains the updated request information
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );
  // Search for friends based on a query

  // Add a new friend
}

export const friendRequestAsyncThunk = new FriendRequestAsyncThunk();
