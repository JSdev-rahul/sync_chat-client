import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { MdDoNotDisturbAlt, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

import { MessageType, SCROLL_BEHAVIOR } from '@/constant';
import { useSocket } from '@/context/SocketContext';
import { useUserDetails } from '@/hooks/useUserDetails';
import dateFormatter from '@/utils/dateFromatter';

import ChatBoxHeader from './chatBoxHeader';
import MessageActionBar from './messageActionBar';

const ChatContainer = ({ Allmessages, selectedUser }) => {
  const [editMessageData, setEditMessageData] = useState('');
  const endOfMessagesRef = useRef(null);

  const { user } = useUserDetails();
  const socket = useSocket();

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: SCROLL_BEHAVIOR });
  }, [Allmessages]);

  const deleteSentMessageHandler = useCallback(messageId => {
    socket.current.emit('deleteSentMessage', { messageId });
  }, []);
  const deleteReceivedMessageHandler = useCallback(messageId => {
    socket.current.emit('deleteReceivedMessage', { messageId });
  }, []);

  const handleDeleteMessage = useCallback(msg => {
    if (msg?.senderId === user?._id) deleteSentMessageHandler(msg?._id);
    else deleteReceivedMessageHandler(msg?._id);
  }, []);

  const renderedMessages = useMemo(
    () =>
      Allmessages?.map(msg => {
        if (msg.isDeletedByReceiver && msg.receiverId === user._id) {
          return null; // Don't render the message box
        }

        return (
          <div
            key={msg._id}
            className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`p-2 max-w-xs rounded-lg text-white ${
                msg.senderId === user._id ? 'bg-cyan-700' : 'bg-gray-700'
              }`}
            >
              <div className="text-2xl flex justify-between items-center">
                <div className="flex justify-center items-center gap-5">
                  <div>
                    {msg.isDeletedBySender && (
                      <MdDoNotDisturbAlt className="text-3xl text-center" />
                    )}
                  </div>
                  <div>{msg.content}</div>
                </div>
                <div>
                  {msg.isDeletedBySender ||
                  (msg.senderId == editMessageData.senderId &&
                    editMessageData._id == msg._id) ? null : (
                    <div className="flex gap-2">
                      <MdOutlineDelete
                        className="text-white text-3xl cursor-pointer ml-5 hover:scale-150"
                        onClick={() => handleDeleteMessage(msg)}
                      />
                      {msg.senderId == user._id && (
                        <MdOutlineEdit
                          className="text-white text-3xl cursor-pointer hover:scale-150"
                          onClick={() => {
                            setEditMessageData(msg), setMessage(msg.content);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1 flex justify-between gap-7">
                <div>{dateFormatter(msg.createdAt)}</div>
                <div>{msg.isEdited && MessageType.EDITED} </div>
              </div>
            </div>
          </div>
        );
      }),
    [Allmessages],
  );

  return (
    <>
      <div className="bg-gray-900 w-full flex flex-col p-11 ">
        <div className="flex-1 overflow-y-auto">
          <ChatBoxHeader selectedUser={selectedUser} />

          <div className="relative flex flex-col h-screen bg-gray-900">
            <div className="flex-1 overflow-y-auto p-4 mb-20">
              {renderedMessages}
              <div ref={endOfMessagesRef} /> {/* Empty div to act as a scroll target */}
            </div>
            <div>
              <MessageActionBar
                {...{
                  editMessageData,
                  setEditMessageData,
                  selectedUser,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ChatContainer);
