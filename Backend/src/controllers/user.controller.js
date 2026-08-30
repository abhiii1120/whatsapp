import * as userDao from "../dao/user.dao.js"
import buildSuccessResponse from "../utils/buildSuccessResponse.js";
import {  InternalServerError } from "../utils/errors/InternalServer.js";


/**
 * search a user by the provided username.
 * @param {Object} req - the request object. 
 * @param {Object} res - thee response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * @throws {Error} - Throws an error if the search operation fails.
 */
export const searchUserByUsername = async (req,res) => {
    const {query} = req.query

    try {
        const users = await userDao.searchUserByUsername(query);
        return buildSuccessResponse(res,'Users retrieved successfully',{
            users
        })
        
    } catch (error) {
        console.error("Error searching users",error);
        return InternalServerError("Internal server error");
    }
}