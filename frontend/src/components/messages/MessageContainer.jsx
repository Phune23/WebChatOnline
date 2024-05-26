import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessagesSquare } from "react-icons/lu";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { AiFillCloseCircle } from "react-icons/ai";

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  
  const [isOpenOrtherUser, setIsOpenOrtherUser] = useState(false);

  const openDialogOrtherUser = () => {
    setIsOpenOrtherUser(true);
  };

  const closeDialogOrtherUser = () => {
    setIsOpenOrtherUser(false);
  };

  useEffect(() => {
    //cleaup function (unmounts)
    return () => setSelectedConversation(null);
  },[setSelectedConversation]);

  return (
    <div className=" flex flex-col minMaxMessageContainer responsiveMobileChat responsiveMobileSizeBoxChat">
        {!selectedConversation ? (
          <NoChatSelected/> 
        ) : ( 
          <>
            {/* Header */}
            <div className="bg-violet-600 px-4 py-2 mb-2 flex">                
              <button onClick={openDialogOrtherUser}>
                <img 
                    src={selectedConversation.profilePic}
                    alt="user avatar" 
                    className="imgUserinLogout"
                  />
              </button>
              <div className="">
                <span className="text-gray-100 font-bold ">{selectedConversation.fullName}</span>
              </div>
              {isOpenOrtherUser && (
                <div className="dialogShowOrtherUser-overlay z-[3]" onClick={closeDialogOrtherUser}>
                  <div className="dialogShowOrtherUser" onClick={(e) => e.stopPropagation()}>
                    <div className="dialogShowOrtherUser-content">
                      <h2 className="text-black editNameDialogProfile">{selectedConversation.fullName}`s Profile</h2>
                      <h3>Avata : 
                      <img 
                        src={selectedConversation.profilePic}
                        alt="user avatar" 
                        className="editImgOrtherProfile"
                      />
                      </h3>
                      <h3 >Full Name : {selectedConversation.fullName}</h3>
                      <h3 >Gen Der : {selectedConversation.gender}</h3>
                      <form>
                        <div>
                          <button className="btn editButtonCloseDialogShowOrtherUserClose" onClick={closeDialogOrtherUser}>
                            <AiFillCloseCircle className="" />
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
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
        <p>Wellcome 👋 {authUser.fullName} ❄</p>

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







// CODE DROPDOW PROFILE 
// import React, { useEffect, useState } from "react";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
// import { LuMessagesSquare } from "react-icons/lu";
// import useConversation from "../../zustand/useConversation";
// import { useAuthContext } from "../../context/AuthContext";
// import { CgMoreO } from "react-icons/cg";
// const MessageContainer = () => {
//   const {selectedConversation, setSelectedConversation} = useConversation();
//   useEffect(() => {
//     //cleaup function (unmounts)
//     return () => setSelectedConversation(null);
//   },[setSelectedConversation]);
//   return (
//     <div className="md:min-w-[450px] flex flex-col responsiveMessageContainer">
//         {!selectedConversation ? (
//           <NoChatSelected/> 
//         ) : ( 
//           <>
//             {/* Header */}
//             <div className="bg-violet-600 px-4 py-2 mb-2 ">                
//                 <span className="label-text ">To: </span>{" "}
//                 <span className="text-gray-900 font-bold ">{selectedConversation.fullName}</span>
//                 <div className="dropdown dropdown-end">
//                   <div tabIndex={0} role="button" className="btn-profile-ortherChatUser">
//                     <div className="">
//                       <CgMoreO />
//                     </div>
//                   </div>
//                   <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//                     <li>
//                       <a className="justify-between">
//                         Full Name:
//                         <span className="badge">{selectedConversation.fullName}</span>
//                       </a>
//                       <a className="justify-between">
//                         Gender:
//                         <span className="badge">{selectedConversation.gender}</span>
//                       </a>
//                       <a className="justify-between">
//                         Age :
//                         <span className="badge">**</span>
//                       </a>
//                       <a className="justify-between">
//                         Birthday :
//                         <span className="badge">**/**/****</span>
//                       </a>
//                     </li>
//                     <li>
//                       <a>
//                         Settings
//                         <span className="badge">Not Run</span>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//             </div>
//             <Messages className="responsiveShowMessageBubble"/>
//             <MessageInput/> 
//           </>
//         )}
//     </div>
//   );
// };
// export default MessageContainer;
// const NoChatSelected = () => {
//   const {authUser} = useAuthContext();
//   return (
//     <div className="flex items-center justify-center w-full h-full"> 
//       <div className="px-4 text-center sm:text-lg md:text-x1 text-gray-200 font-semibold flex flex-col items-center gap-2">
//         <p>Wellcome 👋 {authUser.fullName} ❄</p>
//         <p>Select a chat to start messaging</p>
//         <LuMessagesSquare  className="text-3x1 md:text-6x1 text-center" />
//       </div>
//     </div>
//   );
// };