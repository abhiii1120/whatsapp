 import sessionModel from "../models/session.model.js";
import userModel from "../models/user.model.js";


/**
 * Creates a new session for a user with the provided userId and refreshToken.
 * @param {object} params - the parameteres for creating a session.
 * @param {string} params.userId - the id of the user of whom the session is being created.
 * @param {string} params.refreshToken - the refreshtoken associated with the session.
 * @returns {promise<object>} - the created session object.
 */
 export const createSession = async ({userId,refreshToken}) => {
    const session = await userModel.create({userId,refreshToken})

    return session;
 }

/**
 * retrives the session by the provided userId.
 * @param {string} userId - id of the user for whom to retrieve the session.
 * @returns {Promise<Object|null>} - the retrieved session object or null if not found;
 */
 export const getSessionbyUserId = async (userId) => {
    const session = await userModel.findOne({userId});

    return session;
 }