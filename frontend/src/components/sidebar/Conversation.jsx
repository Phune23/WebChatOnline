import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, emoji, lastIdx, collapsed = false }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div
                className={`flex ${collapsed ? 'justify-center' : 'items-center'} hover:bg-violet-500 rounded ${collapsed ? 'p-1' : 'p-2'} cursor-pointer ${
                    lastIdx ? "" : "mb-1"
                } ${isSelected ? "bg-violet-500" : ""}`}
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
                    <div className="flex flex-col flex-1 ml-2 text-white">
                        <div className="font-medium">{conversation.fullName}</div>
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