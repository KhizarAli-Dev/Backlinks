import postModel from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const allPost = asyncHandler(async (req, res) => {
  const post = await postModel.find({ approval: "approved" });
  if (!post) return res.status(200).json({ message: "No Recorde Found" });
  res.status(200).json({
    message: "Fatch Succesfully",
    postCount: post.length,
    post: post,
  });
});

export default {
  allPost,
};
