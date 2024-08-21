import { useSelector } from 'react-redux';

import dateFormatter from '@/utils/dateFromatter';

export const FriendsList = ({ setSelectedUser }) => {
  const { friendsList } = useSelector(state => state.friendsList);

  return (
    friendsList &&
    friendsList?.map((contact, index) => {
      const { firstName, lastName, email, lastSeen, isOnline = false } = contact?.friendDetails;
      return (
        <div key={index} className="flex items-center mb-4 gap-5 cursor-pointer">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
            <div className="text-lg font-semibold">
              {' '}
              {firstName[0].toUpperCase()}
              {lastName[0].toUpperCase()}
            </div>
          </div>
          <div onClick={() => setSelectedUser(contact?.friendDetails)}>
            <div className="font-semibold">
              {firstName} {lastName} {isOnline ? 'Online' : 'Offline'}
            </div>
            <div className="text-sm text-gray-400">
              {!isOnline && 'LastSeen ' + dateFormatter(lastSeen)}
            </div>
            <div className="text-sm text-gray-400">{email}</div>
          </div>
        </div>
      );
    })
  );
};
