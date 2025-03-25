import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuMessageSquareDashed } from "react-icons/lu";
import { RiChatOffFill } from "react-icons/ri";

const Message = ({ message, onHide, socket }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const nameUser = fromMe ? authUser.fullName : selectedConversation?.fullName;
  const bubblebgColor = fromMe 
    ? 'bg-gradient-to-br from-purple-600 to-violet-800' 
    : "bg-gradient-to-br from-gray-700 to-gray-900";

  const shakeClass = message.shouldShake ? `shake` : ""; 

  const [isHidden, setIsHidden] = useState(message.hidden);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleHideMessage = () => {
    setShowConfirmDialog(true);
  };

  const confirmHideMessage = () => {
    onHide(message._id);
    setIsHidden(true);
    setShowConfirmDialog(false);
    // Emit an event to notify other users
    if (socket) {
      socket.emit("messageHidden", { messageId: message._id });
    }
  };

  const cancelHideMessage = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    setIsHidden(message.hidden);
  }, [message.hidden]);

  useEffect(() => {
    if (socket) {
      // Listen for messageHidden event
      socket.on("messageHidden", ({ messageId }) => {
        if (messageId === message._id) {
          setIsHidden(true);
        }
      });

      return () => {
        socket.off("messageHidden");
      };
    }
  }, [socket, message._id]);

  return (
    <div className={`chat ${chatClassName} my-2`}>
      <div className="chat-header text-white nameUserInchat opacity-80 text-xs mb-1">
        {nameUser}
      </div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ring ring-violet-500 ring-offset-base-100 ring-offset-1">
          <img src={profilePic} alt="user avatar" className="shadow-lg" />
        </div>
      </div>

      {!isHidden ? (
        <div className="message-container flex items-center">
          {/* For left-aligned messages (other people's), put the message first, then button */}
          {!fromMe && (
            <>
              <div className={`message-bubble-ortherChatUser responScreenMessage chat-bubble no-scrollbar text-white ${bubblebgColor} ${shakeClass} shadow-lg border border-violet-300/10 break-words max-w-xs sm:max-w-sm md:max-w-md`}>
                {message.message}
              </div>
              <button 
                onClick={handleHideMessage} 
                className="ml-2 text-white hide-button editButtonHidenMessage btn btn-circle btn-sm bg-violet-700 hover:bg-violet-900 shadow-lg transition-all duration-200"
              >
                <RiChatOffFill className="w-3 h-3" />
              </button>
            </>
          )}
          
          {/* For right-aligned messages (your messages), put button first, then message */}
          {fromMe && (
            <>
              <button 
                onClick={handleHideMessage} 
                className="mr-2 text-white hide-button editButtonHidenMessage btn btn-circle btn-sm bg-violet-700 hover:bg-violet-900 shadow-lg transition-all duration-200"
              >
                <RiChatOffFill className="w-3 h-3" />
              </button>
              <div className={`message-bubble-ortherChatUser responScreenMessage chat-bubble no-scrollbar text-white ${bubblebgColor} ${shakeClass} shadow-lg border border-violet-300/10 break-words max-w-xs sm:max-w-sm md:max-w-md`}>
                {message.message}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-gray-100 italic chat-bubble bg-gray-800/50 flex items-center gap-2 max-w-xs sm:max-w-sm">
          <LuMessageSquareDashed className="w-4 h-4 flex-shrink-0" />
          <span>Tin nhắn đã bị ẩn</span>
        </div>
      )}
      
      <div className="text-white chat-footer opacity-50 text-xs mt-1 flex gap-1 items-center">
        {formattedTime}
      </div>

      {showConfirmDialog && (
        <div className="dialogShowOrtherUser-overlay z-[3] backdrop-blur-sm" onClick={cancelHideMessage}>
          <div className="dialogShowOrtherUser shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="dialogShowOrtherUser-content">
              <h2 className="text-black font-bold text-xl mb-4">Xác nhận ẩn tin nhắn</h2>
              <div className="flex justify-center my-6 text-violet-700">
                <LuMessageSquareDashed className="text-[120px]" />
              </div>
              <p className="mb-6 text-gray-600">Bạn có chắc chắn muốn ẩn tin nhắn này không?</p>
              <div className="flex justify-center gap-4">
                <button className="btn editButtonYesDialogShowOrtherUserClose shadow-md transition-transform hover:scale-105" onClick={confirmHideMessage}>
                  <AiFillCloseCircle className="mr-1" />
                  Có
                </button>
                <button className="btn editButtonCloseDialogShowOrtherUserClose shadow-md transition-transform hover:scale-105" onClick={cancelHideMessage}>
                  <AiFillCloseCircle className="mr-1" />
                  Không
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;