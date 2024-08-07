import { Button } from "@/components/ui/button";
import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import moment from "moment"; // Import moment for date formatting
import InputEmoji from "react-input-emoji";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDoNotDisturbAlt } from "react-icons/md";

const ChatContainer = ({
  message,
  setMessage,
  sendMessage,
  messages,
  user,
  deleteSentMessageHandler,
  deleteReceivedMessageHandler,
  handleEditMessage,
  editMesssageData,
  setEditMessageData,
}) => {
  const endOfMessagesRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Memoize the deleteMessageHandler to avoid unnecessary re-creations
  const handleDeleteMessage = useCallback(
    (msg) => {
      if (msg?.senderId == user?._id) {
        deleteSentMessageHandler(msg?._id);
      } else {
        deleteReceivedMessageHandler(msg?._id);
      }
    },
    [deleteSentMessageHandler, deleteReceivedMessageHandler]
  );
  const renderedMessages = useMemo(
    () =>
      messages?.map((msg) => {
        if (msg?.isDeletedByReceiver && msg?.receiverId === user?._id) {
          return null; // Don't render the message box
        }

        return (
          <div
            key={msg._id}
            className={`flex ${
              msg?.senderId === user?._id ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-2 max-w-xs rounded-lg text-white ${
                msg?.senderId === user?._id ? "bg-cyan-700" : "bg-gray-700"
              }`}
            >
              <div className="text-2xl flex justify-between items-center">
                <div className="flex justify-center items-center gap-5">
                  <div>
                    {msg?.isDeletedBySender ? (
                      <MdDoNotDisturbAlt className="text-3xl text-center" />
                    ) : null}
                  </div>
                  <div>{msg?.content}</div>
                </div>
                <div>
                  {msg?.isDeletedBySender ||
                  (msg?.senderId == editMesssageData?.senderId &&
                    editMesssageData._id == msg._id) ? null : (
                    <div className="flex gap-2">
                      <MdOutlineDelete
                        className="text-white text-3xl cursor-pointer ml-5 hover:scale-150"
                        onClick={() => handleDeleteMessage(msg)}
                      />
                      {msg?.senderId == user?._id && (
                        <MdOutlineEdit
                          className="text-white text-3xl cursor-pointer hover:scale-150"
                          onClick={() => {
                            setEditMessageData(msg), setMessage(msg?.content);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1 flex justify-between gap-7">
                <div>
                  {moment(msg?.createdAt).format("MMMM D, YYYY h:mm A")}
                </div>
                <div>{msg?.isEdited ? "Edited" : null}</div>
              </div>
            </div>
          </div>
        );
      }),
    [messages, user, handleDeleteMessage]
  );

  return (
    <div className="relative flex flex-col h-[85vh] bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 mb-20">
        {renderedMessages}
        <div ref={endOfMessagesRef} />{" "}
        {/* Empty div to act as a scroll target */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t-2 border-gray-600 p-2 py-4 flex items-center bg-gray-800">
        {editMesssageData ? (
          <TiDeleteOutline
            onClick={() => {
              setMessage(""), setEditMessageData("");
            }}
            className="text-white text-4xl hover:scale-125"
          />
        ) : null}

        <InputEmoji
          value={message}
          onChange={setMessage}
          cleanOnEnter
          onEnter={() =>
            editMesssageData
              ? handleEditMessage(editMesssageData)
              : sendMessage()
          }
          placeholder="Type a message"
        />
        <Button
          disabled={message?.length <= 0}
          onClick={() =>
            editMesssageData
              ? handleEditMessage(editMesssageData)
              : sendMessage()
          } // Send message on button click
          className="p-2 px-4 bg-blue-600 text-white rounded"
        >
          {editMesssageData ? "Edit message" : "Send Message"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ChatContainer);
