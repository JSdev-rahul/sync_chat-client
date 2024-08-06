import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth.slice"
export default combineReducers({
  auth: authSlice,
})