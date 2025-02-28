import { useCallback } from "react";
import axios from "axios";

const useHideMessage = () => {
  const hideMessage = useCallback(async (messageId) => {
    //console.log("Sending request to hide message with ID:", messageId);
    try {
      await axios.patch(`/api/messages/hide/${messageId}`);
    } catch (error) {
      console.error("Failed to hide message:", error);
    }
  }, []);

  return hideMessage;
};

export default useHideMessage;