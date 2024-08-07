import React from "react";

const ChatBoxHeader = ({ selectedUser }) => {
  return (
    <div className="text-white text-2xl font-semibold mb-4">
      {selectedUser ? (
        <div className="flex gap-5 items-center border-b-2 border-white pb-3">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
            <div className="text-2xl font-bold text-balance text-ellipsis">
                {/* {
                    selectedUser?.avatar?<img src={selectedUser?.avatar} />:null
                } */}
              {selectedUser?.firstName[0].toUpperCase()}
              {selectedUser?.lastName[0].toUpperCase()}
            </div>
          </div>
          <div>
            <h1>{selectedUser?.firstName} {selectedUser?.lastName}</h1>
            <div className="text-sm text-gray-400">{selectedUser?.lastSeen}</div>
            <div className="text-sm text-gray-400">{selectedUser?.email}</div>

          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ChatBoxHeader);
