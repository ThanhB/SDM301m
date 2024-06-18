import express from 'express';
import AuthenController from "../../controller/webController/authenController.js";
import { authenticateUser } from "../../middleware/jwtAccessToken.js";

const authenWebRouter = express.Router();

//render login page
authenWebRouter.route("/").get(AuthenController.signin).post(AuthenController.signinSuccess);

//render register page
authenWebRouter.route("/signup").get(AuthenController.signup).post(AuthenController.register);


//render register page
export default authenWebRouter;
