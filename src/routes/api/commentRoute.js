import express from "express";
import { authenticateToken } from "../../middleware/jwtAccessToken.js";
import commentController from "../../controller/apiController/commentController.js";

const commentRoute = express.Router();

commentRoute.post("/api/comment", authenticateToken, commentController.createComment);

export default commentRoute;