import React from "react";
import {useAuthContext} from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import {extractTime} from "../../utils/extractTime";

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const nameUser = fromMe ? authUser.fullName : selectedConversation?.fullName;
  const bubblebgColor = fromMe ? 'bg-violet-500' : "";

  const shakeClass = message.shouldShake ? `shake` : ""; 

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

      <div className={`message-bubble-ortherChatUser responScreenMessage chat-bubble text-white ${bubblebgColor} ${shakeClass}`}>
          {message.message}
      </div>
      <div className="text-white chat-footer opacity-50 text-xs flex gap-1 items-center">
          Send at {formattedTime}
      </div>
    </div>
  );
};

export default Message;