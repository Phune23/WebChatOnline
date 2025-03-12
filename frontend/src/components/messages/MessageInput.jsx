import React, { useState, useRef, useEffect } from "react";
import { GrSend } from "react-icons/gr";
import { MdAttachFile } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import useSendMessage from "../../hooks/useSendMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import toast from "react-hot-toast";

const MAX_CHARS = 255;

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmoji, setShowEmoji] = useState(false);
  const [image, setImage] = useState(null);
  const [charWarningShown, setCharWarningShown] = useState(false);
  const toastIdRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Auto-resize textarea without showing scrollbars
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set the height to scrollHeight to fit content
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleEmojiSelect = (emoji) => {
    const newLength = message.length + emoji.native.length;
    
    if (newLength > MAX_CHARS) {
      if (!charWarningShown) {
        toastIdRef.current = toast.error(`Tin nhắn không thể vượt quá ${MAX_CHARS} ký tự`, {
          duration: 2000,
          id: "char-limit",
        });
        setCharWarningShown(true);
        setTimeout(() => setCharWarningShown(false), 3000);
      }
      return;
    }
    
    setMessage(message + emoji.native);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    
    // Always set the message if it's shorter than the current one
    if (value.length <= message.length || value.length <= MAX_CHARS) {
      setMessage(value);
    } 
    // Show warning only when exceeding the limit
    else if (value.length > MAX_CHARS && !charWarningShown) {
      toastIdRef.current = toast.error(`Tin nhắn không thể vượt quá ${MAX_CHARS} ký tự`, {
        duration: 2000,
        id: "char-limit",
      });
      setCharWarningShown(true);
      setTimeout(() => setCharWarningShown(false), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      toast.error("Tính năng gửi file đang phát triển và hiện không khả dụng.");
      return;
    }
    if (!message) return;
    if (message.length > MAX_CHARS) {
      toast.error(`Tin nhắn không thể vượt quá ${MAX_CHARS} ký tự`);
      return;
    }
    await sendMessage(message);
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

  // Determine character count color
  const getCharCountColor = () => {
    if (message.length > MAX_CHARS * 0.9) return "text-red-500";
    if (message.length > MAX_CHARS * 0.8) return "text-amber-500";
    if (message.length > MAX_CHARS * 0.7) return "text-yellow-500";
    return "text-gray-400";
  };

  return (
    <form className="px-4 py-4 bg-gray-900/30 backdrop-blur-sm rounded-b-lg shadow-inner" onSubmit={handleSubmit}>
      {image && (
        <div className="relative mb-3 rounded-lg overflow-hidden">
          <img src={image} alt="Selected" className="max-w-full h-auto rounded" />
          <button
            type="button"
            className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-1 shadow-lg transition-all duration-200"
            onClick={removeImage}
          >
            <AiFillCloseCircle size={24} />
          </button>
        </div>
      )}
      <div className="w-full relative inpSendMesage">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={MAX_CHARS + 10} // Allow slightly over for better UX but still limit
            className="border text-sm rounded-lg block w-full p-3 bg-gray-800 border-gray-700 text-white pr-44 shadow-inner focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-200 resize-none no-scrollbar"
            placeholder="Gửi tin nhắn..."
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{ minHeight: '45px' }}
          />
        </div>
        <label className={`absolute text-xs ${getCharCountColor()} inset-y-0 end-28 flex items-center pe-3`}>
          <span className="transition-colors duration-200">
            {message.length}/{MAX_CHARS}
          </span>
        </label>
        <label className="absolute icon-size inset-y-0 end-20 flex items-center pe-3 text-violet-400 hover:text-violet-200 transition-colors duration-200 cursor-pointer">
          <input type="file" name="file" className="hidden" onChange={sendFile} />
          <MdAttachFile />
        </label>
        <span
          className="absolute icon-size inset-y-0 end-12 flex items-center pe-3 text-violet-400 hover:text-violet-200 transition-colors duration-200 cursor-pointer"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <MdEmojiEmotions />
        </span>
        <div className={`setBoardEmoji z-[2] transform transition-all duration-300 ${showEmoji ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {showEmoji && (
            <div className="shadow-2xl rounded-lg">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                emojiSize={24}
                emojiButtonSize={28}
                maxFrequentRows={0}
                theme="dark"
              />
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="absolute icon-size inset-y-0 end-3 flex items-center pe-3 text-violet-400 hover:text-violet-200 transition-colors duration-200"
          disabled={loading || message.length > MAX_CHARS}
        >
          {loading ? 
            <div className="loading loading-spinner text-violet-500"></div> : 
            <GrSend className={`transform hover:scale-110 transition-transform duration-200 ${message.length > 0 ? 'text-violet-400' : 'text-gray-500'}`} />
          }
        </button>
      </div>
    </form>
  );
};

export default MessageInput;