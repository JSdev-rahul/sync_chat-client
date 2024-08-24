import { useSelector } from 'react-redux';

import { useUserDetails } from '@/hooks/useUserDetails';
import useFetchFriendList from '@/queries/useFetchFriendList';

export const FriendsList = ({ setSelectedUser }) => {

  const { userId } = useUserDetails();
  
  const { isLoading, isSuccess, data } = useFetchFriendList(userId);
  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    data &&
    data?.map((contact, index) => {
      const { userName, email, isOnline } = contact?.friendDetails;
      return (
        <div
          key={index}
          className="flex items-center mb-4 gap-5 cursor-pointer"
          onClick={() => setSelectedUser(contact?.friendDetails)}
        >
          <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
            <div className="text-lg font-semibold">{userName[0]?.toUpperCase()}</div>

            {isOnline && (
              <span className="absolute top-0 right-0 flex h-3 w-3 z-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-0"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="font-semibold">{userName}</div>
            <div className="text-xs text-gray-400">{email}</div>
          </div>
        </div>
      );
    })
  );
};
