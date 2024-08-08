const API_CONFIG = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  CREATE_PROFILE: "/auth/profile",

  // user
  SEARCH_FRIENDS: "/user/searchUser",
  // friends
  GET_FRIENDS_LIST: "/friends/getFriends/:userId",

  ADD_FRIEND: "/friends/add",

  // friend Request
  GET_ALL_FRIEND_REQUEST: "/friendRequest/getAllFriendRequest/:userId",
  UPDATE_FRIEND_REQUEST_STATUS: "/friendRequest/updateStatus/:friendRequestId",
  ACCEPT_FRIEND_REQUEST: "/friendRequest/acceptFriendRequest",
};
const API_ENDPOINT = {
  // User Authentication Endpoints
  SIGNUP: API_CONFIG.SIGNUP,
  LOGIN: API_CONFIG.LOGIN,
  CREATE_PROFILE: API_CONFIG.CREATE_PROFILE,

  // Friends Endpoints
  GET_FRIENDS_LIST: API_CONFIG.GET_FRIENDS_LIST,
  SEARCH_FRIENDS: API_CONFIG.SEARCH_FRIENDS,
  ADD_FRIEND: API_CONFIG.ADD_FRIEND,
  GET_ALL_FRIEND_REQUEST: API_CONFIG.GET_ALL_FRIEND_REQUEST,
  UPDATE_FRIEND_REQUEST_STATUS: API_CONFIG.UPDATE_FRIEND_REQUEST_STATUS,
  ACCEPT_FRIEND_REQUEST: API_CONFIG.ACCEPT_FRIEND_REQUEST,
};

export default API_ENDPOINT;
