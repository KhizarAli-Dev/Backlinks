import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is allready Exist"],
  },
  password: {
    type: String,
    required: [true, "Password must be a 8 digites"],
  },
  limit: {
    type: Number,
    required: [true, "Limit is Required"],
    default: 0,
  },
  role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
