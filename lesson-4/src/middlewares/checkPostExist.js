import { posts } from "../data/post.js";

export const checkPostExist = (req, res, next) => {
  try {
    const { id } = req.params;

    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new Error("Post is not exist");
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

// DELETE api/post/:id?userId=HIUHUIHIU
