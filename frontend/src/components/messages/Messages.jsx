import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import { ImArrowDown } from "react-icons/im";
import useHideMessage from "../../hooks/useHideMessage"; // Import hook
import { useSocketContext } from "../../context/SocketContext"; // Import useSocketContext

const Messages = () => {
  const { messages, loading, setMessages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  const containerRef = useRef();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const hideMessage = useHideMessage(); // Sử dụng hook
  const { socket } = useSocketContext(); // Lấy socket từ context

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleScroll = () => {
    if (containerRef.current.scrollTop < containerRef.current.scrollHeight - containerRef.current.clientHeight - 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHideMessage = async (messageId) => {
    //console.log("handleHideMessage called with messageId:", messageId); // Log bổ sung
    // Gọi hàm hideMessage để cập nhật trên server
    try {
      await hideMessage(messageId);
      //console.log("hideMessage called on server for messageId:", messageId); // Log bổ sung
      // Cập nhật state ngay lập tức sau khi gọi hàm hideMessage
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((message) =>
          message._id === messageId ? { ...message, hidden: true } : message
        );
        //console.log("Updated Messages:", updatedMessages); // Kiểm tra state sau khi cập nhật
        return updatedMessages;
      });
    } catch (error) {
      //console.error("Failed to hide message on server:", error);
    }
  };

  return (
    <div className="relative flex-1 overflow-auto minMaxResponMessageContainerMobie responsiveSizeChatBox" ref={containerRef} onScroll={handleScroll}>
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} onHide={handleHideMessage} socket={socket} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}

      {showScrollButton && (
        <button
          className="button_scroll fixed bottom-16 left-2/3 editButtonSearch btn btn-circle bg-violet-500 text-white z-50"
          onClick={scrollToBottom}
        >
          <ImArrowDown className="w-6 h-6 text-violet-200" />
        </button>
      )}
    </div>
  );
};

export default Messages;
