import express from "express";
import WatchController from "../../controller/apiController/watchController.js";


const watchRouter = express.Router();

//GET all watches
watchRouter.get("/api/watch", WatchController.getWatches);
//get watch by id
watchRouter.get("/api/watch/:id", WatchController.getWatchById);

watchRouter.post("/api/create-watch", WatchController.createWatch);

export default watchRouter;
