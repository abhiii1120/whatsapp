import globalApi from "../../shared/global.api";

/**
 * create conversation with recipientId
 * @param {string} recipientId - recipientId
 * @returns {Promise<object>} - conversation object
 */
export const createConversation = async (recipientId) => {
  try {
    const response = await globalApi.post("/chats/conversation", { recipientId });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gell all conversations of loggedInUser
 * @returns {Promsie<Array>} - Array of conversations
 */
export const getMyConversations = async () => {
  try {
    const response = await globalApi.get("/chats/conversation")
    return response.data.data.conversations;
  } catch (error) {
    console.log(error);
    return null;
  }
}