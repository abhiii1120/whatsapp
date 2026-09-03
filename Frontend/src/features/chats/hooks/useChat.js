import { searchUsers } from "../../shared/global.api";
import { useDispatch } from "react-redux";
import {
  setSearchUserResult,
  appendConversation,
  setActiveConversation,
  setConversations,
  appendMessage,
  setMessages,
} from "../state/chat.slice";
import {
  addListener,
  createSocketConnection,
  emitEvent,
} from "../../shared/services/chat.socket";
import { createConversation, getMessages, getMyConversations, } from "../services/chats.api";

const useChat = () => {
  let dispatch = useDispatch();

  const handleSearchUser = async (query) => {
    try {
      const users = await searchUsers(query);
      dispatch(setSearchUserResult(users));
    } catch (error) {
      console.error("Error searching users:", error);
      dispatch(setSearchUserResult([])); 
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

  const handleSendChatMessage = (message,conversationId) => {
    emitEvent("sendMessage", message);
    dispatch(appendMessage({conversationId,message}))
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
      dispatch(setConversations(conversations));
    } catch (error) {
      console.error("Error getting conversation:", error);
      dispatch(setConversations([]));
    }
  };

const handleGetMessages = async () => {
  const messages = await getMessages();
  console.log("messages map:", messages); // should show { convId: [...], convId: [...] } directly, no `.data` or `.message` wrapper
  dispatch(setMessages(messages));
};

  const setupSocket = () => {
    createSocketConnection();
    addListener("receiveMessage", (message) => {
      dispatch(appendMessage({ conversationId: message.conversationId, message }));
    });
  };


  return {
    handleSearchUser,
    handleAppendConversation,
    handleSetActiveConversation,
    handleSetConversations,
    createSocketConnection,
    createSocketConnection,
    handleCreateConversation,
    handleGetMyConversation,
    handleSendChatMessage,
    handleGetMessages,
    setupSocket
  };
};

export default useChat;
