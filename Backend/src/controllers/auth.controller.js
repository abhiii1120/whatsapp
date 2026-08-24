import * as userDao from "../dao/user.dao.js";
import * as authUtils from "../utils/auth.utils.js";
import * as sessionDao from "../dao/session.dao.js";
import buildSuccessResponse from "../utils/buildSuccessResponse.js";

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
    return res.status(400).json({ message: "user already exists" });
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
 * @returns 
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userDao.getUserByEmailOrUsername({ email });
  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
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
