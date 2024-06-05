import express from "express";
import AuthenController from "../../controller/apiController/authenController.js";

const authenRouter = express.Router();

//login
authenRouter.post("/api/authen/login", AuthenController.login);

//register
authenRouter.post("/api/authen/register", AuthenController.register);

export default authenRouter;