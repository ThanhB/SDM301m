import {
    checkTokenExpirationMiddleware,
    isAdminWeb,
    webAuthenticateToken,
  } from "../../middleware/jwtAccessToken.js";
import express from 'express';
import memberController from '../../controller/webController/memeberController.js';
const memberWebRouter = express.Router();

memberWebRouter.route("/userprofile").get(checkTokenExpirationMiddleware, memberController.getMemberById);

memberWebRouter.route("/editprofile").get(checkTokenExpirationMiddleware, memberController.editMember).post(checkTokenExpirationMiddleware, memberController.updateMember);

memberWebRouter.route("/changepassword").post(checkTokenExpirationMiddleware, memberController.chagePassword);

memberWebRouter.get(
    "/admin/dashboard",
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    memberController.dashboard
  );
  

export default memberWebRouter;

