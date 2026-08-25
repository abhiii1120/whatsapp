import * as userDao from "../dao/user.dao.js";
import * as authUtils from "../utils/auth.utils.js";
import * as sessionDao from "../dao/session.dao.js";
import buildSuccessResponse from "../utils/buildSuccessResponse.js";
import NotFound from "../utils/errors/NotFound.js";

/**
 * Registers a new user with the provided username,email and password.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @returns {Promise<void>} - A promise that resolves when a user is registered.
 */
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await userDao.getUserByEmailOrUsername({
    email,
    username,
  });

  if (isUserExists) {
    return NotFound(res, "User already exists");
  }

  const user = await userDao.createUser({ username, email, password });

  const accessToken = authUtils.generateAccessToken(user._id);
  const refreshToken = authUtils.generateRefreshToken(user._id);

  await sessionDao.createSession({ userId: user._id, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return buildSuccessResponse(res, "User registered successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};

/**
 * Logs in a user with provided email and password.
 * @param {Object} req - the request object.
 * @param {Object} res - the response object.
 * @returns {Promise<void>} - A promise that resolves when a user is logged in.
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userDao.getUserByEmailOrUsername({ email });
  if (!user) {
    return NotFound(res, "User not found please check your credentials.");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return NotFound(res, "Password doesn't match");
  }

  const accessToken = authUtils.generateAccessToken(user._id);
  const refreshToken = authUtils.generateRefreshToken(user._id);

  await sessionDao.updateSessionByUserId(user._id, { refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return buildSuccessResponse(res, "User logged in successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};

/**
 * Logs out a user by clearing the refresh token cookie and deleting the session.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */
export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return NotFound(res, "Refresh token not found");
  }

  try {
    const decoded = authUtils.verifyRefreshToken(refreshToken);
    await sessionDao.deleteSessionByUserId(decoded.userId);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return buildSuccessResponse(res, "Logged out successfully");
  } catch (error) {
    return NotFound(res, "Invalid or expired refresh token");
  }
};

/**
 * Refreshes user's access token and refresh token and update session with new refresh token
 * @param {object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when user's gets new refresh token and new session.
 */
export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return NotFound(res, "Refresh Token not found");
  }

  try {
    const decoded = authUtils.verifyRefreshToken(refreshToken);

    const session = await sessionDao.getSessionbyUserId(decoded.userId);

    if (!session) {
      return NotFound(res, "Session not found");
    }

    const isRefreshTokenValid = session.compareRefreshToken(refreshToken);

    if (!isRefreshTokenValid) {
      return NotFound(res, "Invalid refresh token");
    }

    const newAccessToken = authUtils.generateAccessToken(decoded.userId);
    const newRefreshToken = authUtils.generateRefreshToken(decoded.userId);

    await sessionDao.updateSessionByUserId(decoded.userId, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return buildSuccessResponse(res, "Tokens refreshed successfully", {
      accessToken: newAccessToken,
    });
  } catch (error) {}
};

/**
 * function for get me
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user data is retrieved.
 */
export const getMe = async (req, res) => {
  const userId = req.userId;

  const user = await userDao.getUserById(userId);

  if (!user) {
    return NotFound("User not found");
  }

  return buildSuccessResponse(res, "User data retrieved successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
