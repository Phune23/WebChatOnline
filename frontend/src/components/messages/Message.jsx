import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuMessageSquareDashed } from "react-icons/lu";
import { RiChatOffFill } from "react-icons/ri";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const messageRef = useRef(null);

  const handleHideMessage = () => {
    setShowConfirmation(true);
  };

  const confirmHideMessage = () => {
    onHide(message._id);
    setIsHidden(true);
    setShowConfirmation(false);
    // Emit an event to notify other users
    if (socket) {
      socket.emit("messageHidden", { messageId: message._id });
    }
  };

  const cancelHideMessage = () => {
    setShowConfirmation(false);
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
    <div className={`chat ${chatClassName} my-2 px-4`}>
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
          {/* For left-aligned messages (other people's) */}
          {!fromMe && (
            <>
              <div className="relative" ref={messageRef}>
                {showConfirmation ? (
                  <div className="message-bubble-ortherChatUser responScreenMessage chat-bubble text-white bg-black/90 backdrop-blur-sm shadow-xl border border-violet-500/20 flex flex-col items-center justify-center min-w-[200px] min-h-[130px] z-10">
                    <p className="text-white text-sm font-medium mb-4 px-4 text-center">Ẩn tin nhắn này?</p>
                    <div className="flex gap-5">
                      <button 
                        onClick={confirmHideMessage} 
                        className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                      >
                        <HiCheckCircle className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={cancelHideMessage} 
                        className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                      >
                        <HiXCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`message-bubble-ortherChatUser responScreenMessage chat-bubble no-scrollbar text-white ${bubblebgColor} ${shakeClass} shadow-lg border border-violet-300/10 break-words max-w-xs sm:max-w-sm md:max-w-md`}>
                    {message.message}
                  </div>
                )}
              </div>
              {!showConfirmation && (
                <button 
                  onClick={handleHideMessage} 
                  className="ml-2 text-white hide-button editButtonHidenMessage btn btn-circle btn-sm bg-violet-700 hover:bg-violet-900 shadow-lg transition-all duration-200"
                >
                  <RiChatOffFill className="w-3 h-3" />
                </button>
              )}
            </>
          )}
          
          {/* For right-aligned messages (your messages) */}
          {fromMe && (
            <>
              {!showConfirmation && (
                <button 
                  onClick={handleHideMessage} 
                  className="mr-2 text-white hide-button editButtonHidenMessage btn btn-circle btn-sm bg-violet-700 hover:bg-violet-900 shadow-lg transition-all duration-200"
                >
                  <RiChatOffFill className="w-3 h-3" />
                </button>
              )}
              <div className="relative" ref={messageRef}>
                {showConfirmation ? (
                  <div className="message-bubble-ortherChatUser responScreenMessage chat-bubble text-white bg-black/90 backdrop-blur-sm shadow-xl border border-violet-500/20 flex flex-col items-center justify-center min-w-[200px] min-h-[130px] z-10">
                    <p className="text-white text-sm font-medium mb-4 px-4 text-center">Ẩn tin nhắn này?</p>
                    <div className="flex gap-5">
                      <button 
                        onClick={confirmHideMessage} 
                        className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                      >
                        <HiCheckCircle className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={cancelHideMessage} 
                        className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                      >
                        <HiXCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`message-bubble-ortherChatUser responScreenMessage chat-bubble no-scrollbar text-white ${bubblebgColor} ${shakeClass} shadow-lg border border-violet-300/10 break-words max-w-xs sm:max-w-sm md:max-w-md`}>
                    {message.message}
                  </div>
                )}
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
    </div>
  );
};

export default Message;