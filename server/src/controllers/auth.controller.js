import * as userDao from "../dao/user.dao.js";

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
};
