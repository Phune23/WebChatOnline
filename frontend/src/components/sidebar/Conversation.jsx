import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({conversation, lastIdx, emoji, collapsed = false}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div 
                className={`flex gap-2 items-center rounded-xl p-2 py-3 cursor-pointer transition-all duration-300
                    ${isSelected ? "bg-gradient-to-r from-violet-700 to-violet-900 shadow-lg scale-105" : "hover:bg-violet-800/50"}
                `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className={`${collapsed ? "w-10" : "w-12"} rounded-full ring-2 ring-offset-2 ring-offset-gray-800 transition-all duration-300 ${isSelected ? "ring-white" : "ring-violet-500"} ${isOnline ? "border-2 border-green-500" : ""}`}>
                        <img 
                            src={conversation.profilePic}
                            alt="user avatar"
                            className="shadow-md"
                        />
                    </div>
                </div>

                {!collapsed && (
                  <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                          <p className={`font-bold truncate ${isSelected ? "text-white" : "text-gray-200"}`}>
                              {conversation.fullName}
                          </p>
                          <span className="text-xl flex-shrink-0">{emoji}</span>
                      </div>
                      {isOnline && (
                          <p className="text-xs text-green-400 mt-1">Online</p>
                      )}
                  </div>
                )}
            </div>
            
            {!lastIdx && <div className="divider my-1 py-0 h-1 opacity-40" />}
        </>
    );
};

export default Conversation;