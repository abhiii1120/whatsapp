import { searchUsers } from "../../shared/global.api";
import { useDispatch } from "react-redux";
import {
  setSearchUserResult,
  appendConversation,
  setActiveConversation,
  setConversations,
} from "../state/chat.slice";
import {createSocketConnection} from "../../shared/services/chat.socket";

const useChat = () => {
  let dispatch = useDispatch();

  const handleSearchUser = async (query) => {
    try {
      const users = await searchUsers(query);
      dispatch(setSearchUserResult(users));
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  const handleSetActiveConversation = (conversationId) => {
    dispatch(setActiveConversation(conversationId));
  };

  const handleSetConversations = (conversatios) => {
    dispatch(setConversations(conversatios));
  };

  const handleAppendConversation = (conversation) => {
    dispatch(appendConversation(conversation));
  }

  return {
    handleSearchUser,
    handleAppendConversation,
    handleSetActiveConversation,
    handleSetConversations,
    createSocketConnection,
    createSocketConnection,
  };
};

export default useChat;
