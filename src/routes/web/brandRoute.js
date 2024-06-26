import express from "express";
import BrandController from "../../controller/webController/brandController.js";
import {
  checkTokenExpirationMiddleware,
  isAdminWeb,
  webAuthenticateToken,
} from "../../middleware/jwtAccessToken.js";

const brandWebRoute = express.Router();

brandWebRoute.get(
  "/admin/brands",
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  BrandController.brandPage
);

brandWebRoute.get(
  "/admin/brands/edit/:id",
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  BrandController.brandEdit
);

export default brandWebRoute;
