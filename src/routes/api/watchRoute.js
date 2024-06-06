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
//create watch
watchRouter.post(
  "/api/create-watch",
  authenticateToken,
  WatchController.createWatch
);

//update watch
watchRouter.put(
  "/api/update-watch/:id",
  authenticateToken,
  WatchController.updateWatch
);

//delte watch
watchRouter.delete(
  "/api/delete-watch/:id",
  authenticateToken,
  WatchController.deleteWatch
);


export default watchRouter;
