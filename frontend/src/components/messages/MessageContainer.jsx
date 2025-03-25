import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessagesSquare } from "react-icons/lu";
import { FiUser, FiMessageCircle } from "react-icons/fi";
import { HiStatusOnline } from "react-icons/hi";
import { RiUserHeartLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isOpenOrtherUser, setIsOpenOrtherUser] = useState(false);
  const { onlineUsers } = useSocketContext();
  const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

  const openDialogOrtherUser = () => {
    setIsOpenOrtherUser(true);
  };

  const closeDialogOrtherUser = () => {
    setIsOpenOrtherUser(false);
  };

  useEffect(() => {
    // Cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col flex-1 h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header - Thiết kế hiện đại hơn */}
          <div className="bg-gradient-to-r from-violet-700 to-violet-600 px-4 py-3 mb-2 flex items-center shadow-md">
            <button 
              onClick={openDialogOrtherUser}
              className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img
                  src={selectedConversation.profilePic}
                  alt={selectedConversation.fullName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shadow-lg"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-violet-600"></span>
                )}
              </div>
              <div className="ml-3">
                <span className="text-white font-medium block">
                  {selectedConversation.fullName}
                </span>
                <span className="text-violet-200 text-xs flex items-center">
                  {isOnline ? (
                    <>
                      <HiStatusOnline className="mr-1" /> Đang hoạt động
                    </>
                  ) : (
                    "Ngoại tuyến"
                  )}
                </span>
              </div>
            </button>
            
            {/* Profile Dialog - Thiết kế hiện đại */}
            {isOpenOrtherUser && (
              <div
                className="dialogShowOrtherUser-overlay z-30"
                onClick={closeDialogOrtherUser}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header của dialog */}
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 relative">
                    <button
                      onClick={closeDialogOrtherUser}
                      className="absolute top-4 right-4 bg-white/20 rounded-full p-1 text-white hover:bg-white/40 transition-all"
                    >
                      <IoClose size={20} />
                    </button>
                    
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <img
                          src={selectedConversation.profilePic}
                          alt={selectedConversation.fullName}
                          className="w-24 h-24 rounded-full border-4 border-white/30 object-cover shadow-lg"
                        />
                        {isOnline && (
                          <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-violet-600"></span>
                        )}
                      </div>
                      <h2 className="text-white text-xl font-bold">
                        {selectedConversation.fullName}
                      </h2>
                      <span className="text-violet-200 text-sm flex items-center mt-1">
                        {isOnline ? (
                          <>
                            <HiStatusOnline className="mr-1" /> Đang hoạt động
                          </>
                        ) : (
                          "Ngoại tuyến"
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {/* Thông tin người dùng */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FiUser className="text-violet-500 mr-3 w-5 h-5" />
                        <div>
                          <div className="text-sm text-gray-500">Họ và tên</div>
                          <div className="font-medium">{selectedConversation.fullName}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <RiUserHeartLine className="text-violet-500 mr-3 w-5 h-5" />
                        <div>
                          <div className="text-sm text-gray-500">Giới tính</div>
                          <div className="font-medium">{selectedConversation.gender}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Nút đóng */}
                    <div className="mt-8 flex justify-center">
                      <button
                        className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full flex items-center shadow-lg hover:shadow-xl transition-all"
                        onClick={closeDialogOrtherUser}
                      >
                        <FiMessageCircle className="mr-2" />
                        Tiếp tục trò chuyện
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-900/20 backdrop-blur-sm">
      <div className="px-4 py-8 text-center bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-xl max-w-md mx-auto">
        <div className="bg-violet-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <LuMessagesSquare className="text-5xl text-violet-300" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Xin chào, {authUser.fullName}!</h3>
        <p className="text-gray-300 mb-6">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
        <div className="w-16 h-1 bg-violet-500 mx-auto opacity-50 rounded-full"></div>
      </div>
    </div>
  );
};