import { FcCheckmark } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';

import { FriendRequestType, ToastMessageKey } from '@/constant';
import { useUserDetails } from '@/hooks/useUserDetails';
import { friendRequestAsyncThunk } from '@/redux/asyncThunk/friendRequest.asyncThunk';
import { showErrorToast, showSuccessToast } from '@/utils/toaster';

const FriendRequestList = ({
  friendsRequest,
  requestType,
  fetchFriendRequests,
  fetchFriendListHandler,
}) => {
  const dispatch = useDispatch();
  const { user } = useUserDetails();
  const userId = user._id;
  const onUpdateFriendRequestStatus = (id, status = FriendRequestType.DECLINED) => {
    dispatch(friendRequestAsyncThunk.updateFriendRequestStatus({ friendRequestId: id, status }))
      .unwrap()
      .then(() => {
        fetchFriendRequests();
      })
      .catch(() => {
        showErrorToast(ToastMessageKey.FAILED_TO_UPDATE_FRIEND_REQUEST);
      });
  };
  const onAcceptFriendRequest = (friendId, friendReqeustId) => {
    dispatch(friendRequestAsyncThunk.acceptFriendRequest({ userId, friends: [friendId] }))
      .unwrap()
      .then(() => {
        onUpdateFriendRequestStatus(friendReqeustId, FriendRequestType.ACCEPTED);
        fetchFriendListHandler();
        showSuccessToast(ToastMessageKey.FRIEND_REQUEST_ACCESPTED);
      })
      .catch(() => {
        showErrorToast(ToastMessageKey.FAILED_TO_UPDATE_FRIEND_REQUEST);
      });
  };

  return friendsRequest?.map(item => {
    const { firstName, lastName, _id } = item?.friendRequestDetails;
    return (
      <div
        key={_id}
        className="flex items-center justify-between mb-4 gap-5 cursor-pointer hover:bg-gray-100 border-b-2"
      >
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
          <div className="text-lg font-semibold">
            {' '}
            {firstName[0].toUpperCase()}
            {lastName[0].toUpperCase()}
          </div>
        </div>
        <div>
          <div className="font-semibold">
            {firstName} {lastName}
          </div>
          <div className="text-sm text-gray-400">{lastSeen}</div>
          <div className="text-sm text-gray-400">{email}</div>
        </div>
        <div className="flex gap-5">
          <div className="bg-white rounded-full p-1 text-white shadow-2xl hover:scale-125">
            <FcCheckmark onClick={() => onAcceptFriendRequest(_id, item?._id)} />
          </div>
          {requestType == FriendRequestType.PENDING && (
            <div
              onClick={() => onUpdateFriendRequestStatus(item?._id)}
              className="bg-red-500 rounded-full p-1 text-white shadow-2xl hover:scale-125"
            >
              <RxCross2 />
            </div>
          )}
        </div>
      </div>
    );
  });
};

export default FriendRequestList;
