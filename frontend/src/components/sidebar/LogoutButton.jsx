import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import NoChatSelected from "./NoChatSelected";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto areaLogout flex flex-col w-full lg:flex-row">
      {!loading ? (
        <div className="grid flex-grow place-items-center responsiveDivLogoutButton">
          <BiLogOut className="cursor-pointer btn-logout-listChatUser" onClick={logout} />
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <div className="grid flex-grow place-items-center">
        <NoChatSelected className="cursor-pointer" />
      </div>
    </div>
  );
};

export default LogoutButton;