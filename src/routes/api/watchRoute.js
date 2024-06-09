import express from "express";
import WatchController from "../../controller/apiController/watchController.js";
import { authenticateToken } from "../../middleware/jwtAccessToken.js";
import { isAdmin } from "../../middleware/authen.js";
const watchRouter = express.Router();

//GET all watches
watchRouter.get("/api/watch", WatchController.getWatches);

//get watch by name
watchRouter.get(
  "/api/watch/search/:key",
  WatchController.getWatchByName
);

//filter watch by brand
watchRouter.get(
  "/api/watch/brand/:id",
  WatchController.getWatchByBrandId
);

//get watch by id
watchRouter.get(
  "/api/watch/:id", 
  authenticateToken,
  WatchController.getWatchById
);
//create watch
watchRouter.post(
  "/api/create-watch", isAdmin,
  authenticateToken,
  WatchController.createWatch
);

//update watch
watchRouter.put(
  "/api/update-watch/:id", isAdmin,
  authenticateToken,
  WatchController.updateWatch
);

//delte watch
watchRouter.delete(
  "/api/delete-watch/:id", isAdmin,
  authenticateToken,
  WatchController.deleteWatch
);


export default watchRouter;
