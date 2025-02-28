import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuMessageSquareDashed } from "react-icons/lu";
import { RiChatOffFill } from "react-icons/ri";

const Message = ({ message, onHide }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const nameUser = fromMe ? authUser.fullName : selectedConversation?.fullName;
  const bubblebgColor = fromMe ? 'bg-violet-500' : "";

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
  };

  const cancelHideMessage = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    setIsHidden(message.hidden);
  }, [message.hidden]);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-header text-white nameUserInchat ">
        {nameUser}
      </div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>

      {!isHidden ? (
        <div className="message-container flex items-center">
          {fromMe && (
            <button onClick={handleHideMessage} className="ml-2 text-white hide-button editButtonHidenMessage btn btn-circle bg-violet-500">
              <RiChatOffFill className="w-4 h-4" />
            </button>
          )}
          <div className={`message-bubble-ortherChatUser responScreenMessage chat-bubble text-white ${bubblebgColor} ${shakeClass}`}>
            {message.message}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 italic chat-bubble">This message has been hidden</div>
      )}
      <div className="text-white chat-footer opacity-50 text-xs flex gap-1 items-center">
        Send at {formattedTime}
      </div>

      {showConfirmDialog && (
        <div className="dialogShowOrtherUser-overlay z-[3]" onClick={cancelHideMessage}>
          <div className="dialogShowOrtherUser" onClick={(e) => e.stopPropagation()}>
            <div className="dialogShowOrtherUser-content">
              <h2 className="text-black editNameDialogProfile">Confirm Hide Message</h2>
              <div className="flex justify-center my-6">
                <LuMessageSquareDashed className="text-[120px]" />
              </div>
              <p>Are you sure you want to hide this message?</p>
              <div>
                <button className="btn editButtonYesDialogShowOrtherUserClose" onClick={confirmHideMessage}>
                  <AiFillCloseCircle className="" />
                  Yes
                </button>
                <button className="btn editButtonCloseDialogShowOrtherUserClose" onClick={cancelHideMessage}>
                  <AiFillCloseCircle className="" />
                  No
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