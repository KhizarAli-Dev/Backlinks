import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

import postRoutes from "./routes/post.route.js";
app.use("/api/v1/post", postRoutes);

import userRoute from "./routes/user.route.js";
app.use("/api/v1/user", userRoute);

import pluginRoute from "./routes/plugin.route.js";
app.use("/api/v1/plugin", pluginRoute);

export default app;
