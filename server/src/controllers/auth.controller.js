import * as userDao from "../dao/user.dao.js";
import * as authUtils from "../utils/auth.utils.js";
import * as sessionDao from "../dao/session.dao.js";
import buildSuccessResponse from "../utils/buildSuccessResponse.js";
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

  return buildSuccessResponse(res, "User registered successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};
