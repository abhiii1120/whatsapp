import { StatusCodes } from "http-status-codes";

/**
 * UnAuthorized error for general purpose use. ERROR_CODE = 401
 * @param {object} res - Response object for sending error to frontend
 * @param {String} message - Text message that need to be send to frontend.
 * @returns 
 */
export const UnAuthorized = (res, message) => {
  return res.status(StatusCodes.UNAUTHORIZED).json({
    Message: message,
  });
};
