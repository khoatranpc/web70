import { users } from "../data/user.js";

export const checkApiKey = (req, res, next) => {
  try {
    const { apiKey } = req.query;
    if (!apiKey) {
      throw new Error("Missing token");
    }
    const username = apiKey.split(".")[0];
    const findUser = users.find((user) => user.username === username);
    if (!findUser) {
      throw new Error("Token wrong");
    }
    next();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
