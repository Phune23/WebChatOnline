import React, { useState, useEffect } from "react";
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
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái để quản lý chế độ chỉnh sửa

  const openDialog = async () => {
    setIsOpen(true);
    try {
      const response = await fetch(`/api/users/${authUser._id}`);
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setIsEditing(false); // Đặt lại trạng thái chỉnh sửa khi đóng dialog
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    // Gửi yêu cầu cập nhật thông tin người dùng
    try {
      const formData = new FormData();
      Object.keys(userInfo).forEach((key) => {
        formData.append(key, userInfo[key]);
      });

      const response = await fetch(`/api/users/${authUser._id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setUserInfo(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      profilePic: file,
    }));
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
      {isOpen && userInfo && (
        <div className="dialog-overlay z-[3]" onClick={closeDialog}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-content">
              <h2 className="text-black editNameDialogProfile">Edit your profile</h2>
              <h3>Avatar: 
              <img 
                src={userInfo.profilePic instanceof File ? URL.createObjectURL(userInfo.profilePic) : userInfo.profilePic}
                alt="user avatar" 
                className="editImgProfile "
              />
              </h3>
              <div className="form-group">
                <label>Change Avatar:</label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  className="input"
                  disabled={!isEditing}
                />
              </div>
              <form onSubmit={handleSaveClick}>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={userInfo.fullName}
                    onChange={handleChange}
                    className="input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>User Name:</label>
                  <input
                    type="text"
                    name="userName"
                    value={userInfo.userName}
                    onChange={handleChange}
                    className="input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                    className="input"
                    disabled={!isEditing}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <br/>
                <div className="fload-end">
                  {isEditing ? (
                    <button className="btn editButtonCloseDialogSave" type="submit">
                      <FaRegSave />
                      Save
                    </button>
                  ) : (
                    <button className="btn editButtonCloseDialogSave" type="button" onClick={handleUpdateClick}>
                      Update
                    </button>
                  )}
                  <button className="btn editButtonCloseDialogClose" type="button" onClick={closeDialog}>
                    <AiFillCloseCircle/>
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