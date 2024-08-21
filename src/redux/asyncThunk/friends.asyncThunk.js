import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from '../../lib/api-client';
import API_ENDPOINT from '../../lib/api-constants';
import { replaceUrl } from '../constant/redux.constant';

class FriendsAsyncThunk {
  // Fetch friends list with pagination
  fetchFriendsList = createAsyncThunk('friends/fetchList', async (payload, { rejectWithValue }) => {
    const { params, userId } = payload;
    try {
      const endPoint = replaceUrl(API_ENDPOINT.GET_FRIENDS_LIST, { userId });
      const response = await ApiClient.get(endPoint, { params });
      return response.data; // Assuming response.data contains the list of friends
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  });

  // Search for friends based on a query
  searchFriends = createAsyncThunk('friends/search', async (payload, { rejectWithValue }) => {
    try {
      const { params } = payload;
      console.log('pay', payload);
      const response = await ApiClient.get(API_ENDPOINT.SEARCH_FRIENDS, {
        params,
      });
      return response.data; // Assuming response.data contains the search results
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  });

  // Add a new friend
  addFriend = createAsyncThunk('friends/add', async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(API_ENDPOINT.ADD_FRIEND, payload);
      return response.data; // Assuming response.data contains the updated friends list
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  });
}

export const friendsAsyncThunk = new FriendsAsyncThunk();
