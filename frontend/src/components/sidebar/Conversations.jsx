import React from "react";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = ({ collapsed = false }) => {
  const {loading, conversations} = useGetConversations();
  
  return (
    // Giữ nguyên như đã đề xuất
    <div className={`py-2 flex flex-col overflow-auto btn-list-ortherChatUser ${collapsed ? 'px-0' : 'px-1'}`}>
      {/* Các phần tử con */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
          collapsed={collapsed}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null} 
    </div>
  );
};

export default Conversations;