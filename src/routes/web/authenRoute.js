import express from 'express';
import AuthenController from "../../controller/webController/authenController.js";

const authenWebRouter = express.Router();

//render login page
authenWebRouter.route("/").get(AuthenController.signin).post(AuthenController.signinSuccess);

//render register page
authenWebRouter.route("/signup").get(AuthenController.signup).post(AuthenController.register);

authenWebRouter.route("/logout").get(AuthenController.logout);
//render register page
export default authenWebRouter;
