import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import NoChatSelected from "./NoChatSelected";

const LogoutButton = ({ collapsed = false }) => {
  const { loading, logout } = useLogout();
  
  return (
    <div className={`mt-auto areaLogout flex ${collapsed ? 'justify-center' : 'flex-col lg:flex-row'} w-full`}>
      {!loading ? (
        <div className="grid flex-grow place-items-center">
          <BiLogOut 
            className="cursor-pointer btn-logout-listChatUser text-xl" 
            onClick={logout} 
          />
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      
      {/* Khi sidebar không thu gọn, hiển thị thêm NoChatSelected */}
      {!collapsed && (
        <div className="grid flex-grow place-items-center">
          <NoChatSelected className="cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default LogoutButton;