import express from "express";
import AuthenController from "../../controller/apiController/authenController.js";
import { authenticateUser } from "../../middleware/jwtAccessToken.js";
const authenRouter = express.Router();

//login
authenRouter.post("/api/authen/login", AuthenController.login);

//register
authenRouter.post("/api/authen/register", AuthenController.register);

//get user info
authenRouter.get('/api/authen/user/info',  authenticateUser, AuthenController.getUserInfo);

export default authenRouter;