import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { token } from "morgan";

/**
 *
 * Generates a jwt access token for given userid.
 * @param {string} userId - id of the user for whom we are generating access token.
 * @returns {string} - the generated jwt access token.
 */

export const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

/**
 * Generates a jwt refresh token for given userid.
 * @param {string} userId - id of the user for whom we are generating refresh token.
 * @returns {string} - generated refresh acccess token.
 */
export const generateRefreshToken = (userId, id) => {
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};

/**
 * Verifies the provided JWT refresh Token
 * @param {string} token - The jwt refresh token to verify. 
 * @returns {Object} = the decoded payload of the verified token.
 */
export const verifyRefreshToken = (token) => {

 const decoded = jwt.verify(token,env.JWT_REFRESH_TOKEN_SECRET);
 console.log(decoded)
 return decoded
}

/**
 * Verifies the provided JWT access token.
 * @param {string} token - The jwt access token to verify.
 * @returns {Object} - the decoded payload of the verified token.
 */
export const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token,env.JWT_ACCESS_TOKEN_SECRET);
  return decoded;
}