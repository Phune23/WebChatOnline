import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessagesSquare } from "react-icons/lu";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  useEffect(() => {
    //cleaup function (unmounts)
    return () => setSelectedConversation(null);
  },[setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
        {!selectedConversation ? (
          <NoChatSelected/> 
        ) : ( 
          <>
            {/* Header */}
            <div className="bg-violet-600 px-4 py-2 mb-2">
                <span className="label-text">To: </span>{" "}
                <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
            </div>

            <Messages/>
            <MessageInput/> 
          </>
        )}
    </div>
  );
};

export default MessageContainer;



const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full"> 
      <div className="px-4 text-center sm:text-lg md:text-x1 text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p  >Wellcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <LuMessagesSquare  className="text-3x1 md:text-6x1 text-center" />
      </div>
    </div>
  );
};

// STARTER CODE SNIPPET
// import React from "react";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";

// const MessageContainer = () => {
//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//         <>
//             {/* Header */}
//             <div className="bg-violet-600 px-4 py-2 mb-2">
//                 <span className="label-text">To: </span>{" "}
//                 <span className="text-gray-900 font-bold">Phune</span>
//             </div>

//             <Messages/>
//             <MessageInput/> 
//         </>
//     </div>
//   );
// };

// export default MessageContainer;