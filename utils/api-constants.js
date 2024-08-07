const API_CONFIG = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  CREATE_PROFILE: "/auth/profile",

  // user
  SEARCH_FRIENDS: "/user/searchUser",
  // friends
  GET_FRIENDS_LIST: "/friends/getFriends/:userId",

  ADD_FRIEND: "/friends/add",
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
};

export default API_ENDPOINT;
