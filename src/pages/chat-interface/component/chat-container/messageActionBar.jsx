import React, { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import InputEmoji from 'react-input-emoji';

import { Button } from '@/components/ui/button';
import { BUTTON_LABELS } from '@/constant';
import { useChatContainerContext } from '@/context/PageContext';
import { useSocket } from '@/context/SocketContext';
import { useUserDetails } from '@/hooks/useUserDetails';

const MessageActionBar = () => {
  const { editMessageData, setEditMessageData, selectedUser } = useChatContainerContext();

  const [message, setMessage] = useState('');
  const socket = useSocket();
  const { user } = useUserDetails();
  const receiverId = selectedUser?._id;
  const senderId = user?._id;

  const handleEditMessage = msg => {
    setEditMessageData('');
    setMessage('');
    const updatedMessage = { ...msg, content: message };
    socket.current.emit('editMessage', { updatedMessage });
  };
  const sendMessage = () => {
    const data = {
      content: message,
      senderId,
      receiverId,
    };
    socket.current.emit('sendMessage', {
      ...data,
    });
    setMessage('');
  };

  const handleMessageAction = () => {
    if (editMessageData) handleEditMessage(editMessageData);
    else sendMessage();
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t-2 border-gray-600 p-2 py-4 flex items-center bg-gray-800">
      {editMessageData ? (
        <TiDeleteOutline
          onClick={() => {
            setMessage(''), setEditMessageData('');
          }}
          className="text-white text-4xl hover:scale-125"
        />
      ) : null}

      <InputEmoji
        value={message}
        onChange={setMessage}
        cleanOnEnter
        onEnter={() => handleMessageAction()}
        placeholder="Type a message"
      />
      <Button
        disabled={message?.length <= 0}
        onClick={() => handleMessageAction()}
        className="p-2 px-4 bg-blue-600 text-white rounded"
      >
        {editMessageData ? BUTTON_LABELS.EDIT : BUTTON_LABELS.SEND}
      </Button>
    </div>
  );
};

export default React.memo(MessageActionBar);
