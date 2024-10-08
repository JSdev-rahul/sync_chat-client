import { useChatInterfaceContext } from '@/context/PageContext';
import React from 'react';

const ChatBoxHeader = () => {
  const {selectedUser}=useChatInterfaceContext()
  const { userName = '', lastSeen, email } = selectedUser;
  return (
    <div className="text-white text-2xl pl-2 pt-2 font-semibold mb-4 border-b-2 border-white rounded-2xl fixed z-50 bg-gray-800  sm:w-[77%] md:w-[65%] lg:w-[77%]">
      {selectedUser ? (
        <div className="flex gap-5 items-center rounded-2xl pb-3">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
            <div className="text-2xl font-bold text-balance text-ellipsis">
              {userName[0]?.toUpperCase()}
            </div>
          </div>
          <div>
            <h1>{userName}</h1>
            <div className="text-sm text-gray-400">{lastSeen}</div>
            <div className="text-sm text-gray-400">{email}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ChatBoxHeader);
