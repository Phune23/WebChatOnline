import React, { useEffect, useRef, useState, useCallback } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import { ImArrowDown } from "react-icons/im";
import axios from "axios";

const useHideMessage = () => {
  const hideMessage = useCallback(async (messageId) => {
    console.log("Sending request to hide message with ID:", messageId); // Add this line
    try {
      await axios.patch(`/api/messages/hide/${messageId}`);
    } catch (error) {
      console.error("Failed to hide message:", error);
    }
  }, []);

  return hideMessage;
};

const Messages = () => {
  const { messages, loading, setMessages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  const containerRef = useRef();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const hideMessage = useHideMessage(); // Use the custom hook

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
    //console.log("Hiding message with ID:", messageId); // Add this line
    await hideMessage(messageId);
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message._id === messageId ? { ...message, hidden: true } : message
      )
    );
  };

  return (
    <div className="relative flex-1 overflow-auto minMaxResponMessageContainerMobie responsiveSizeChatBox" ref={containerRef} onScroll={handleScroll}>
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} onHide={handleHideMessage} />
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
