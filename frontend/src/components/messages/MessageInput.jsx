import React, { useState } from "react";
import { GrSend } from "react-icons/gr";
import { MdAttachFile } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import useSendMessage from "../../hooks/useSendMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmoji, setShowEmoji] = useState(false);
  const [image, setImage] = useState(null);

  const handleEmojiSelect = (emoji) => {
    if (message.length + emoji.native.length > 255) {
      toast.error("Message cannot exceed 255 characters");
      return;
    }
    setMessage(message + emoji.native);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 255) {
      toast.error("Message cannot exceed 255 characters");
      return;
    }
    setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      toast.error("The file sending feature is under development and is currently unavailable.");
      return;
    }
    if (!message) return;
    if (message.length > 255) {
      return toast.error("Message cannot exceed 255 characters");
    }
    const messageData = {
      text: message || "", // Ensure text is a string
      image: image || null, // Ensure image is null if not provided
    };
    await sendMessage(messageData);
    if (showEmoji) {
      setShowEmoji(!showEmoji);
    }
    setMessage("");
    setImage(null);
  };

  const sendFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        // Reset the input value to allow selecting the same file again
        e.target.value = null;
      };
      reader.onerror = (error) => {
        console.log("Error:", error);
      };
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      {image && (
        <div className="relative mb-2">
          <img src={image} alt="Selected" className="max-w-full h-auto" />
          <button
            type="button"
            className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
            onClick={removeImage}
          >
            <AiFillCloseCircle size={20} />
          </button>
        </div>
      )}
      <div className="w-full relative inpSendMesage">
        <div className="relative w-full">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pr-44"
            placeholder="Send a message"
            value={message}
            onChange={handleChange}
          />
        </div>
        <label className="absolute text-xs text-gray-400 inset-y-0 end-28 flex items-center pe-3 btn-sendMessage-ortherChatUser">
          {message.length}/255
        </label>
        <label className="absolute icon-size inset-y-0 end-20 flex items-center pe-3 btn-sendMessage-ortherChatUser">
          <input type="file" name="file" className="hidden" onChange={sendFile} />
          <MdAttachFile />
        </label>
        <span
          className="absolute icon-size inset-y-0 end-12 flex items-center pe-3 btn-sendMessage-ortherChatUser"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <MdEmojiEmotions />
        </span>
        <div className="setBoardEmoji z-[2]">
          {showEmoji && (
            <div className="">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                emojiSize={24}
                emojiButtonSize={28}
                maxFrequentRows={0}
              />
            </div>
          )}
        </div>
        <button type="submit" className="absolute icon-size inset-y-0 end-3 flex items-center pe-3 btn-sendMessage-ortherChatUser">
          {loading ? <div className="loading loading-spinner"></div> : <GrSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

//STARTER CODE SNIPPET
// import React from "react";
// import { GrSend } from "react-icons/gr";

// const MessageInput = () => {
//   return (
//     <form className="px-4 my-3">
//         <div className="w-full">
//             <input 
//                 type="text" 
//                 className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" 
//                 placeholder="Send a message"
//             >            </input>
            
//             <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
//               <GrSend />
//             </button>

//         </div>
//     </form>
    
//   );
// };

// export default MessageInput;