import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import post from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// JWT sign function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register Method
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, limit } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please provide all required fields"));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email already exists"));
  }

  const user = await User.create({ name, email, password, limit });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          name: user.name,
          email: user.email,
          limit: user.limit,
          role: user.role,
        },
      },
      "User registered successfully"
    )
  );
});

// Login Method
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please provide email and password"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid email or password"));
  }

  // Password verification (here we're directly comparing; ideally, use a hashed password)
  if (user.password !== password) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid email or password"));
  }

  const token = generateToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          name: user.name,
          email: user.email,
          limit: user.limit,
          role: user.role,
        },
        token,
      },
      "User logged in successfully"
    )
  );
});

// Logout controller
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()), // Set to the past to expire the cookie
    secure: process.env.NODE_ENV === "production",
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Get All User
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  if (users <= 0)
    res.status(200).json(new ApiResponse(200, null, "No User Availabe"));
  const userCount = users.length;
  res
    .status(200)
    .json(
      new ApiResponse(200, { userCount, users }, "Users fatch Successfully")
    );
});

// Get User by ID
const getSpecificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// Delete User by ID
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

// Update User by ID
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, limit } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email, password, limit },
    { new: true, runValidators: true } // `new: true` returns updated document
  );

  if (!updatedUser) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

// user Post
const userPost = asyncHandler(async (req, res, next) => {
  const loginUserId = req.user._id;
  const user = await User.findById(loginUserId)
  const usersPost = await post.find({ user: loginUserId });

  if (usersPost <= 0)
    res.status(200).json(new ApiResponse(200, null, "No Post Availabe"));

  const postCount = usersPost.length;
  const userLimit = user.limit
  res
    .status(200)
    .json(
      new ApiResponse(200, {userLimit,  postCount, usersPost }, "Users fatch Successfully")
    );
});

export default {
  register,
  login,
  logout,
  getAllUsers,
  getSpecificUser,
  deleteUser,
  updateUser,
  userPost,
};
