import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, collapsed = false }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <div
            className={`flex ${collapsed ? 'justify-center' : 'items-center'} 
                      ${isSelected 
                          ? 'bg-gradient-to-r from-violet-700 to-violet-600 shadow-md' 
                          : 'hover:bg-gray-800/60'} 
                      rounded-lg transition-all duration-200 cursor-pointer
                      ${collapsed ? 'p-1 mb-2' : 'p-2 mb-1'}`}
            onClick={() => setSelectedConversation(conversation)}
        >
            <div className="relative">
                <img
                    src={conversation.profilePic}
                    alt={conversation.fullName}
                    className={`rounded-full object-cover border-2 
                              ${isSelected 
                                  ? 'border-white shadow-lg' 
                                  : isOnline 
                                      ? 'border-green-500' 
                                      : 'border-gray-700'}
                              ${collapsed ? 'w-10 h-10' : 'w-11 h-11'}`}
                />
                
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                )}
            </div>

            {!collapsed && (
                <div className="ml-3 overflow-hidden flex-1">
                    <span className={`block font-medium truncate ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {conversation.fullName}
                    </span>
                    <span className={`block text-xs truncate ${
                        isSelected ? 'text-violet-200/80' : isOnline ? 'text-green-400' : 'text-gray-500'
                    }`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Conversation;