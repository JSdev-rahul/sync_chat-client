export const FormType = {
  LOGIN: 'LogIn',
  SIGN_UP: 'SignUp',
};

export const ToastMessageKey = {
  SUCCESS: 'success',
  ERROR: 'error',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  LOGIN_SUCCESS: 'The user has been logged in successfully.',
  SIGNUP_SUCCESS: 'The user has been created successfully.',
  PROFILE_CREATED: 'Profile successfully created',
  MESSAGE_EDITED: 'Your message has been edited',
  MESSAGE_DELETE_BY_RECEIVER: 'Message deleted by receiver',
  MESSAGE_DELETE_BY_SENDER: 'Message deleted by sender',
  NEW_FRIEND_ADDED: 'Friend added successfully',
  FAILED_TO_ADD_USER_IN_FRIENDLIST: 'Failed to add friend. Please try again.',
  FRIEND_REQUEST_FETCHED: 'Friend requests fetched successfully!',
  FAILED_TO_UPDATE_FRIEND_REQUEST: 'Failed to update friend request!',
  FRIEND_REQUEST_ACCESPTED: 'Friend request accespted ',
};

export const SCROLL_BEHAVIOR = 'smooth';

export const FriendRequestType = {
  PENDING: 'pending',
  ACCEPTED: 'accept',
  DECLINED: 'decline',
};

const TabsLable={
  PENDING:"Pending",
  DECLINED:'Decline'
}

export const FriendRequestTabs = [
  {
    label: TabsLable.PENDING,
    status: FriendRequestType.PENDING,
  },
  {
    label: TabsLable.DECLINED,
    status: FriendRequestType.DECLINED,
  },
];



export const MessageType = {
  EDITED: 'Edited',
};

export const BUTTON_LABELS = {
  EDIT: 'Edit message',
  SEND: 'Send Message',
  SUBMIT: 'Submit',
};
