import express from 'express';
import WatchController from "../../controller/webController/watchController.js";


const watchWebRouter = express.Router();

//render watch home page
watchWebRouter.route("/home").get(WatchController.getwatch);


export default watchWebRouter;