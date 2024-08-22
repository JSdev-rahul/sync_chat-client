import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ToastMessageKey } from '@/constant';
import { useUserDetails } from '@/hooks/useUserDetails';
import { updateFriendStatus } from '@/redux/slice/friendsList.slice';

import { useSocket } from '../../context/SocketContext';
import { showSuccessToast } from '../../utils/toaster';

import ChatContainer from './component/chat-container';
import ChatBoxHeader from './component/chat-container/chatBoxHeader';
import ContactContainer from './component/contact-container';
import EmptyChatContainer from './component/emptyChat-container';

const ChatInterface = () => {
  const { user } = useUserDetails();

  const socket = useSocket();
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState('');
  const [Allmessages, setAllMessages] = useState([]);

  const receiverId = selectedUser?._id;

  useEffect(() => {
    socket.current.on('onlineStatus', data => {
      console.log("@@@ onlineStatus",data);
      dispatch(updateFriendStatus(data));
    });
  }, [socket]);

  useEffect(() => {
    if (socket && receiverId) {
      // Emit loadMessages event when receiverId changes
      socket.current.emit('loadMessages', { receiverId });

      // Listen for allMessages event to receive previous messages
      socket.current.on('allMessages', messagesData => {
        setAllMessages(messagesData);
      });

      socket.current.on('receiveMessage', newMessage => {
        setAllMessages(prevMessages => [...prevMessages, newMessage]);
      });

      socket.current.on('messageDeleteResponse', resp => {
        if (resp) {
          const { isDeletedByReceiver, isDeletedBySender, receiverId, senderId } = resp;

          if (!isDeletedBySender && isDeletedByReceiver && receiverId === user?._id) {
            showSuccessToast(ToastMessageKey.MESSAGE_DELETE_BY_RECEIVER);
          } else if (isDeletedBySender && senderId === user?._id) {
            showSuccessToast(ToastMessageKey.MESSAGE_DELETE_BY_SENDER);
          }

          setAllMessages(prevMessages =>
            prevMessages.map(item => (item?._id === resp?._id ? { ...item, ...resp } : item)),
          );
        } else {
        }
      });

      socket.current.on('editMessageResponse', resp => {
        if (resp) {
          if (resp?.senderId == user?._id) {
            showSuccessToast(ToastMessageKey.MESSAGE_EDITED);
          }
          setAllMessages(prevMessages =>
            prevMessages.map(item => (item._id === resp?._id ? { ...item, ...resp } : item)),
          );
        }
      });

      return () => {
        if (socket.current) {
          socket.current.off('allMessages');
          socket.current.off('receiveMessage');
          socket.current.off('messageDeleteResponse');
          socket.current.off('editMessageResponse');
          socket.current.off('onlineStatus');
        }
      };
    }
  }, [socket, receiverId]);

  return (
    <div className="grid grid-cols-[auto_1fr] bg-gradient-to-r from-indigo-500  h-screen p-6">
      {/* Sidebar */}
      <div className="bg-gray-800 border-r-2 border-gray-600 rounded-3xl h-full">
        <div className="p-4 h-full">
          <ContactContainer {...{ setSelectedUser }} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-3 overflow-hidden h-full w-auto ml-2">
        {/* Header */}
        {selectedUser && (
          <div className="flex-none overflow-hidden mb-2 rounded-2xl">
            <ChatBoxHeader selectedUser={selectedUser} />
          </div>
        )}

        {/* Messages */}
        <div className="flex-grow overflow-y-hidden">
          {selectedUser ? (
            <ChatContainer {...{ selectedUser, Allmessages }} />
          ) : (
            <EmptyChatContainer />
          )}
        </div>

        {/* Input Area */}
        <div className="flex-none">{/* Place your input component here */}</div>
      </div>
    </div>
    
  );
};

export default React.memo(ChatInterface);
