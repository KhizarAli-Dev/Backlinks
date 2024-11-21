import express from "express";
import userController from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Import multer middleware for file handling
import { protect } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("/", protect, upload.single("image"), userController.insertpost);
route.get("/", protect, userController.fetchPosts);
route.get("/specificId/:id", userController.fetchPostById);
route.delete("/:id", userController.deletePost);
route.put("/:id", upload.single("image"), userController.updatePost);
route.put("/userPostApproved/:id", userController.userPostApproved);
route.put("/userPostUnapproved/:id", userController.userPostUnapprove);

export default route;
