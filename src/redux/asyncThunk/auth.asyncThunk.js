import { createAsyncThunk } from '@reduxjs/toolkit';

import apiClient from '../../lib/api-client';
import API_ENDPOINT from '../../lib/api-constants';
import { replaceUrl } from '../constant/redux.constant';

class AuthAsyncThunk {
  signUpAsyncThunk = createAsyncThunk('auth/signUp', async (payload, { rejectWithValue }) => {
    try {
      const endPoint = API_ENDPOINT.SIGNUP;
      const response = await apiClient.post(endPoint, payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  });
  loginAsyncThunk = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(API_ENDPOINT.LOGIN, payload);
      return response.data; // Assuming response.data contains the user data and tokens
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  logOutAsyncThunk = createAsyncThunk('auth/logout', async (payload, { rejectWithValue }) => {
    const { userId } = payload;

    try {
      const endPoint = replaceUrl(API_ENDPOINT.LOGOUT, { userId });
      const response = await apiClient.post(endPoint);
      return response.data; // Assuming response.data contains the user data and tokens
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  createProfileAsyncThunk = createAsyncThunk(
    'profile/create',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await apiClient.post(API_ENDPOINT.CREATE_PROFILE, payload);
        return response.data; // Assuming response.data contains the profile data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    },
  );
}
export const authAsyncThunk = new AuthAsyncThunk();
