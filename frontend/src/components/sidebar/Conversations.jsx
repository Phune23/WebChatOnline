import React from "react";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  // console.log("CONVERSATIONS:",conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto btn-list-ortherChatUser">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null} 
    </div>
  );
};

export default Conversations;


//STARTER CODE SNIPPET
// import React from "react";
// import Conversation from "./Conversation";

// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//     </div>
//   );
// };

// export default Conversations;