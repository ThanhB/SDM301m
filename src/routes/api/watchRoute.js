import express from "express";
import WatchController from "../../controller/apiController/watchController.js";
import { authenticateToken } from "../../middleware/jwtAccessToken.js";

const watchRouter = express.Router();

//GET all watches
watchRouter.get("/api/watch", authenticateToken, WatchController.getWatches);
//get watch by id
watchRouter.get(
  "/api/watch/:id",
  authenticateToken,
  WatchController.getWatchById
);

watchRouter.post(
  "/api/create-watch",
  authenticateToken,
  WatchController.createWatch
);

export default watchRouter;
