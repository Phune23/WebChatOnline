import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {

  const {loading, logout} = useLogout();
  return (
    <div className="mt-auto areaLogout flex flex-col w-full lg:flex-row">
      {!loading ? (
        <div className="grid flex-grow place-items-center">
          <BiLogOut  className=" cursor-pointer btn-logout-listChatUser"
          onClick={logout}
        />
        </div> 
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <div className="grid flex-grow place-items-center">
        <NoChatSelected className=" cursor-pointer "/>
      </div>
    </div>
  );
};

export default LogoutButton;

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="grid flex-grow place-items-center">
        <img 
            src={authUser.profilePic}
            alt="user avatar" 
            className="imgUserinLogout"
          />
      </div> 
      <div className="grid flex-grow place-items-center font-bold text-white">{authUser.fullName}</div>
    </div>
  );
};

//STARTER CODE FOR THIS FILE
// import React from "react";
// import { SlLogout } from "react-icons/sl";

// const LogoutButton = () => {
//   return (
//     <div className="mt-auto">
//       <SlLogout className="w-6 h-6 text-white cursor-pointer"/>
//     </div>
//   );
// };

// export default LogoutButton;