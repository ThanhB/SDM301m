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
    "/admin/watches/create",
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    WatchController.createwatch
  );

watchWebRouter
  .route("/admin/watches/:id")
  .get(
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    WatchController.deletewatch
  );

watchWebRouter.get(
  "/admin/watches/edit/:id",
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  WatchController.editwatch
);

watchWebRouter.route("/admin/watches/edit/:id").post(
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  WatchController.updateWatch
);



export default watchWebRouter;
