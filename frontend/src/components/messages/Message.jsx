import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img src="https://icons.veryicon.com/png/o/miscellaneous/generic-icon-3/avatar-empty.png" alt="user avatar" />
            </div>
        </div>

        <div className={"chat-bubble text-white bg-violet-500"}>
            Hi! Xin chao
        </div>
        <div className="text-white chat-footer opacity-50 text-xs flex gap-1 items-center">
            12:42
        </div>
    </div>
  );
};

export default Message;