import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is Required"],
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  image: {
    type: String,
    required: [true, "Image is Required"],
  },
  url_name: {
    type: String,
    required: [true, "Url Name is Required"],
  },
  url: {
    type: String,
    required: [true, "Url is Required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is Required"],
  },
  approval: {
    type: String,
    enum: ["approved", "unapproved"],
    default: "unapproved",
  },
});

const post = mongoose.model("post", postSchema);

export default post;
