import * as conversationDao from "../dao/conversion.dao.js";
import * as UserDao from "../dao/user.dao.js";
import * as messageDao from "../dao/message.dao.js"
import buildSuccessResponse from "../utils/buildSuccessResponse.js";
import NotFound from "../utils/errors/NotFound.js";

/**
 * @description Create a new conversation between two users.
 * @route POST /api/chats/conversation
 * @access Private
 */
export const createConversation = async (req, res) => {
  const user = req.userId;
  console.log(req.body);
  const { recipientId } = req.body;

  if (!recipientId) {
    return NotFound(res, "Recipient ID is required");
  }

  if (user.toString() === recipientId.toString()) {
    return NotFound(res, "You cannot create a conversation with yourself");
  }

  const receiver = await UserDao.getUserById(recipientId);

  if (!receiver) {
    return NotFound(res, "Recipitant user not found");
  }

  const existingConversation =
    await conversationDao.getConversationByParticipants([user, recipientId]);

  if (existingConversation) {
    return buildSuccessResponse(res, "Conversation already exists", {
      conversation: existingConversation,
    });
  }

  const conversation = await conversationDao.createConversation([
    user,
    recipientId,
  ]);

  return buildSuccessResponse(res, "Conversation created successfully", {
    data: conversation,
  });
};

/**
 * @desc Get all conversations for the authenticated user.
 * @route GET /api/chat/conversation
 * @access Private
 */
export const getConversations = async (req, res) => {
  const userId = req.userId;

  const conversations = (
    await conversationDao.getConversationByUserId(userId)
  ).map((conversation) => {
    const recipient = conversation.participants.find(
      (participant) => participant._id.toString() !== userId.toString(),
    );
    return {
      _id: conversation._id,
      participants: conversation.participants,
      recipientId: recipient._id,
      username: recipient.username,
      email: recipient.email,
    };
  });

  return buildSuccessResponse(res, "Conversations retrieved successfully", {
    conversations,
  });
};

export const getMessages = async (req,res) => {
  const userId = req.userId;
  const conversations = await conversationDao.getConversationByUserId(userId);

  const conversationMessages  = await Promise.all(conversations.map(async (conversation) => {
    const conversationMessages= await messageDao.getMessagesByConversationId(conversation._id);
    return {
      conversationId:conversation._id,
      messages:conversationMessages
    }
  }))

  const messages = conversationMessages.reduce((acc,curr) => {
    acc[curr.conversationId] = curr.messages;
    return acc;
  },{})

  return buildSuccessResponse(res,"Messages retrieved successfully",{
    messages
  })
}