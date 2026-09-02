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
