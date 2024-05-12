import React, { useState } from "react";
import { GrSend } from "react-icons/gr";
import { MdAttachFile } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import useSendMessage from "../../hooks/useSendMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) return;
    // window.alert('Tin nhắn đã được gửi: ' + message);
    await sendMessage(message);
    if(showEmoji){
      setShowEmoji(!showEmoji);
    }
    setMessage("");
  };

  const sendFile =async (e) => {
    // console.log(e.target.files);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
            <input 
                type="text" 
                className="border text-sm rounded-lg block w-Inputmessage p-2.5 bg-gray-700 border-gray-600 text-white" 
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <label className="absolute icon-size inset-y-0 end-16 flex items-center pe-3 btn-sendMessage-ortherChatUser">
              <input type="file" className="hidden" onChange={sendFile}/>
              <MdAttachFile />
            </label>
            <span
              className="absolute icon-size inset-y-0 end-9 flex items-center pe-3 btn-sendMessage-ortherChatUser "
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <MdEmojiEmotions />
            </span>
            <div className="setBoardEmoji z-[2]">
              {showEmoji && <div className="">
                <Picker data={data} 
                  onEmojiSelect={handleEmojiSelect} 
                  emojiSize={24}
                  emojiButtonSize={28}
                  maxFrequentRows={0}
                />
              </div>}
            </div>
            <button type="submit" className="absolute icon-size inset-y-0 end-1 flex items-center pe-3 btn-sendMessage-ortherChatUser">
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