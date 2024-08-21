import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './auth.slice';
import friendsListSlice from './friendsList.slice';

export default combineReducers({
  auth: authSlice,
  friendsList: friendsListSlice,
});
