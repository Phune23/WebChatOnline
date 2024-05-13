import React , { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";

const LogoutButton = () => {
  const {loading, logout} = useLogout();
  return (
    <div className="mt-auto areaLogout flex flex-col w-full lg:flex-row responsiveLogoutButton">
      {!loading ? (
        <div className="grid flex-grow place-items-center responsiveDivLogoutButton">
          <BiLogOut  className=" cursor-pointer btn-logout-listChatUser"
          onClick={logout}
        />
        </div> 
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <div className="grid flex-grow place-items-center responsiveDivNameAndPicUser">
        <NoChatSelected className=" cursor-pointer "/>
      </div>
    </div>
  );
};

export default LogoutButton;

const NoChatSelected = () => {

  const {authUser} = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };


  return (
    <div className="flex flex-col lg:flex-row">
      <button onClick={openDialog}>
        <img 
            src={authUser.profilePic}
            alt="user avatar" 
            className="imgUserinLogout"
          />
      </button>
      <div className="grid flex-grow place-items-center font-bold text-white">{authUser.fullName}</div>
      {isOpen && (
        <div className="dialog-overlay z-[3]" onClick={closeDialog}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-content">
              <h2 className="text-black editNameDialogProfile">Edit your profile</h2>
              <h3>Avata : 
              <img 
                src={authUser.profilePic}
                alt="user avatar" 
                className="editImgProfile "
              />
              </h3>
              <h3 >Full Name : {authUser.fullName}</h3>
              <form>
                <div>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="input"
                  />
                </div>
                <br/>
                <div className="fload-end">
                  <button className="btn editButtonCloseDialogSave" type="submit">
                    <FaRegSave />
                    Save
                  </button>
                  <button className="btn editButtonCloseDialogClose" onClick={closeDialog}>
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