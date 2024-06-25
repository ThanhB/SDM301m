import express from "express";
import WatchController from "../../controller/webController/watchController.js";
import commentController from "../../controller/webController/commentController.js";
import {
  checkTokenExpirationMiddleware,
  isAdminWeb,
  webAuthenticateToken,
} from "../../middleware/jwtAccessToken.js";

const watchWebRouter = express.Router();

//render watch home page
watchWebRouter
  .route("/")
  .get(checkTokenExpirationMiddleware, WatchController.getwatch);

//render watch details page
watchWebRouter
  .route("/watch/:id")
  .get(checkTokenExpirationMiddleware, WatchController.getwatchById);
watchWebRouter.post(
  "/watches/:id/comments",
  checkTokenExpirationMiddleware,
  commentController.createComment
);

watchWebRouter.get(
  "/admin/watches",
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  WatchController.watchPage
);

watchWebRouter
  .get(
    "/admin/watches/create",
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    WatchController.createwatchPage
  )
  .post(
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    WatchController.createwatch
  );

export default watchWebRouter;
