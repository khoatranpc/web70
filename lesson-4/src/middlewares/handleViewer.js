import { users } from "../data/user.js";

export const handleViewer = (req, res, next) => {
  const { apiKey } = req.query;
  const post = req.post;
  const user = users.find((user) => user.apiKey === apiKey);
  if (user) {
    if (!post.viewer) {
      post.viewer = [user.id];
    } else {
      if (!post.viewer?.includes(user.id)) {
        post.viewer.push(user.id);
      }
    }
  }
  next();
};
