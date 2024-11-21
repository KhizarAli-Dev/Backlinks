import express from "express";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";
const route = express.Router();

// Import controllers
import userController from "../controllers/user.controller.js";

// Register
route.post("/register", protect, authorizeRoles(1), userController.register);

// Login
route.post("/login", userController.login);

// Logout
route.post("/logout", protect, userController.logout);

// All User
route.get("/", protect, authorizeRoles(1), userController.getAllUsers);

// Delete User
route.delete("/:id", protect, authorizeRoles(1), userController.deleteUser);

// Update User by Id
route.put("/:id", protect, authorizeRoles(1), userController.updateUser);

// Specific User by Id
route.get(
  "/getSpecificUser/:id",
  protect,
  authorizeRoles(1),
  userController.getSpecificUser
);

// get user POST
route.get("/userPost", protect, userController.userPost);

export default route;
