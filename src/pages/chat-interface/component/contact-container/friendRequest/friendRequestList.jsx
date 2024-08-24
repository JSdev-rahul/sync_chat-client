import React, { useCallback } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';

import { FriendRequestType } from '@/constant';
import { useFriendListRequestContext } from '@/context/PageContext';
import { useUserDetails } from '@/hooks/useUserDetails';
import useOnUpdateFriendRequestStatus from '@/queries/useOnUpdateFriendRequestStatus';
import { useOnAcceptFriendRequest } from '@/queries/useonAcceptFriensRequest';

const FriendRequestList = () => {
  const { friendRequestFilters, friendsRequests } = useFriendListRequestContext();
  const { userId } = useUserDetails();

  const { mutate: onUpdateMutate } = useOnUpdateFriendRequestStatus();
  const { mutate: onAcceptMutate } = useOnAcceptFriendRequest();

  const onUpdateFriendRequestStatus = useCallback(
    (friendRequestId, status = FriendRequestType.DECLINED) => {
      onUpdateMutate({ friendRequestId, status });
    },
    [],
  );
  const onAcceptFriendRequest = useCallback((friendId, friendRequestId) => {
    onAcceptMutate({ userId, friends: [friendId], friendRequestId });
  }, []);

  return friendsRequests?.map(item => {
    const { userName, email, _id } = item?.friendRequestDetails;
    return (
      <div
        key={_id}
        className="flex items-center justify-between mb-4 gap-5 cursor-pointer hover:bg-gray-100 border-b-2"
      >
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
          <div className="text-lg font-semibold rounded-full"> {userName[0]?.toUpperCase()}</div>
        </div>
        <div>
          <div className="font-semibold">{userName}</div>
          <div className="text-sm text-gray-400">{email}</div>
        </div>
        <div className="flex gap-5">
          <div className="bg-white rounded-full p-1 text-white shadow-2xl hover:scale-125">
            <FcCheckmark onClick={() => onAcceptFriendRequest(_id, item?._id)} />
          </div>
          {friendRequestFilters.status == FriendRequestType.PENDING && (
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

export default React.memo(FriendRequestList);
