import { searchUsers } from "../../shared/global.api";
import { useDispatch } from "react-redux";
import {
  setSearchUserResult,
  appendConversation,
  setActiveConversation,
  setConversations,
} from "../state/chat.slice";
import {
  createSocketConnection,
  emitEvent,
} from "../../shared/services/chat.socket";
import { createConversation, getMyConversations } from "../services/chats.api";

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
  };

  const handleSendChatConversation = (message) => {
    emitEvent("sendMessage", message);
  };

  const handleCreateConversation = async (recipientId) => {
    try {
      const conversation = await createConversation(recipientId);
      dispatch(appendConversation(conversation));
      dispatch(setActiveConversation(conversation._id));
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleGetMyConversation = async () => {
    try {
      const conversations = await getMyConversations();
      console.log(conversations)
      dispatch(setConversations(conversations));
    } catch (error) {
      console.error("Error getting conversation:", error);
      dispatch(setConversations([]));
    }
  };

  return {
    handleSearchUser,
    handleAppendConversation,
    handleSetActiveConversation,
    handleSetConversations,
    createSocketConnection,
    createSocketConnection,
    handleSendChatConversation,
    handleCreateConversation,
    handleGetMyConversation,
  };
};

export default useChat;
