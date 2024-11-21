import express from "express";
import pluginController from "../controllers/plugin.controller.js";
const route = express.Router();

route.get('/', pluginController.allPost)

export default route;