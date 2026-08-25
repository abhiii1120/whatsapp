import userModel from "../models/user.model.js";

/**
 *  creates a new user with the provided username,email, and password.
 * @param {Object} params - the parameters for creating the user. 
 * @param {string} params.username - the username of the user.
 * @param {string} params.email - the email of the user.
 * @param {string} params.password - the password of the user.
 * @returns {Promise<Object>} - the created user object.
 */

export const createUser = async ({username,email,password}) => {
    const user = await userModel.create({username,email,password});

    return user;
}
/**
 * 
 * @param {Object} params - the parameters for retrieving a user.
 * @param {string} params.email - the email of the user.
 * @param {string} param.username - the username of the user.
 * @returns {Promise<Object>} - the retrived user object
 */
export const getUserByEmailOrUsername = async ({email,username}) => {
    const user = await userModel.findOne({
        $or:[
            {email},
            {username},
        ]
    })

    return user;
}

export const getUserById = async (userId) =>{
    const user = await userModel.findById(userId);
    return user
}