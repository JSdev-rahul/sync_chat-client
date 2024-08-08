import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../context/SocketContext"; // Adjust the path according to your file structure
import { useSelector } from "react-redux";
import ChatContainer from "./component/chat-container";
import ContactContainer from "./component/contact-container";
import EmptyChatContainer from "./component/emptyChat-container";
import Logo from "./component/Logo";
import showToast from "../../../utils/toaster";
import ChatBoxHeader from "./ChatBoxHeader ";
import FriendRequestPage from "./component/friendRequest";

const Chat = () => {
  const [editMesssageData, setEditMessageData] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  const receiverId = selectedUser?._id;
  const senderId = user?._id;

  console.log("selectedUser", selectedUser);

  useEffect(() => {
    if (socket && receiverId) {
      // Emit loadMessages event when receiverId changes
      socket.current.emit("loadMessages", { receiverId });

      // Listen for allMessages event to receive previous messages
      socket.current.on("allMessages", (allMessages) => {
        console.log("allMessages", allMessages);
        setMessages(allMessages);
      });

      // Listen for incoming messages
      socket.current.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.current.on("messageDeleteResponse", (resp) => {
        if (resp) {
          const {
            isDeletedByReceiver,
            isDeletedBySender,
            receiverId,
            senderId,
          } = resp;

          if (
            !isDeletedBySender &&
            isDeletedByReceiver &&
            receiverId === user?._id
          ) {
            showToast(
              "success",
              "Message deleted by receiver",
              "Receive Delete"
            );
          } else if (isDeletedBySender && senderId === user?._id) {
            showToast("success", "Message deleted by sender", "Send Delete");
          }

          setMessages((prevMessages) =>
            prevMessages.map((item) =>
              item?._id === resp?._id ? { ...item, ...resp } : item
            )
          );
        } else {
        }
      });

      socket.current.on("editMessageResponse", (resp) => {
        if (resp) {
          if (resp?.senderId == user?._id) {
            showToast("info", "Your message has been edited", "edited");
          }
          // Update messages state with the response from the server
          setMessages((prevMessages) =>
            prevMessages.map((item) =>
              item._id === resp?._id ? { ...item, ...resp } : item
            )
          );
        } else {
        }
      });

      return () => {
        if (socket.current) {
          socket.current.off("allMessages");
          socket.current.off("receiveMessage");
          socket.current.off("messageDeleteResponse");
          socket.current.off("editMessageResponse");
        }
      };
    }
  }, [socket, receiverId]);

  const sendMessage = () => {
    const data = {
      content: message,
      senderId,
      receiverId,
    };
    socket.current.emit("sendMessage", {
      ...data,
    });
    setMessage("");
  };
  const deleteSentMessageHandler = useCallback((messageId) => {
    socket.current.emit("deleteSentMessage", { messageId });
  });
  const deleteReceivedMessageHandler = useCallback((messageId) => {
    socket.current.emit("deleteReceivedMessage", { messageId });
  });

  const handleEditMessage = (msg) => {
    setEditMessageData("");
    setMessage("");
    const updatedMessage = { ...msg, content: message };
    socket.current.emit("editMessage", { updatedMessage });
  };

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <div className="bg-gray-800 w-96 border-r-2 border-gray-600 flex flex-col items-center p-4">
        {/*  */}
        <div>
          <Logo />
        </div>
        <div className="flex flex-col justify-center">
      <h2 className="text-white text-lg font-semibold mb-4 mt-6 flex items-center space-x-4">
        <span># My Contacts</span>
        <FriendRequestPage />
       
      </h2>
      <span className="text-gray-300">{user?.email}</span>
    </div>
        <div className="flex flex-start">
          <ContactContainer setSelectedUser={setSelectedUser} />
        </div>
      </div>

      <div className="bg-gray-900 w-full flex flex-col p-4">
        <div className="flex-1 overflow-y-auto mb-4">
          <ChatBoxHeader selectedUser={selectedUser} />
          <div>
            {selectedUser ? (
              <ChatContainer
                user={user}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                messages={messages}
                deleteSentMessageHandler={deleteSentMessageHandler}
                deleteReceivedMessageHandler={deleteReceivedMessageHandler}
                handleEditMessage={handleEditMessage}
                editMesssageData={editMesssageData}
                setEditMessageData={setEditMessageData}
              />
            ) : (
              <EmptyChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
