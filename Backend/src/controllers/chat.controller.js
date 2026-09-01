import * as conversationDao from "../dao/conversion.dao.js";
import * as UserDao from "../dao/user.dao.js";
import buildSuccessResponse from "../utils/buildSuccessResponse.js";
import NotFound from "../utils/errors/NotFound.js";

/**
 * @description Create a new conversation between two users.
 * @route POST /api/chats/conversation
 * @access Private
 */
export const createConversation = async (req,res) => {
    const user = req.userId;
    const {recipientId} = req.body;

    if(!recipientId){
        return NotFound(res,'Recipient ID is required');
    }

    if(user.toString() === recipientId.toString()){
        return NotFound(res,'You cannot create a conversation with yourself');
    }

    const receiver = await UserDao.getUserById(recipientId);

    if(!receiver){
        return NotFound('Recipitant user not found');
    }

    const existingConversation = await conversationDao.getConversationByParticipants([user,recipientId]);

    if(existingConversation){
        return buildSuccessResponse(res,'Conversation already exists',{
            conversation:existingConversation,
        })
    }
}