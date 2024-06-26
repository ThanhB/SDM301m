import express from "express";
import BrandController from "../../controller/webController/brandController.js";
import {
  checkTokenExpirationMiddleware,
  isAdminWeb,
  webAuthenticateToken,
} from "../../middleware/jwtAccessToken.js";

const brandWebRoute = express.Router();

//brand list
brandWebRoute.get(
  "/admin/brands",
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  BrandController.brandPage
);

//edit brand page
brandWebRoute.get(
  "/admin/brands/edit/:id",
  checkTokenExpirationMiddleware,
  webAuthenticateToken,
  isAdminWeb,
  BrandController.brandEdit
);

//update brand
brandWebRoute
  .route("/admin/brands/edit/:id")
  .post(
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    BrandController.updateBrand
  );

//delete brand
brandWebRoute
  .route("/admin/brands/:id")
  .get(
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    BrandController.deleteBrand
  );

// create brand page

brandWebRoute
  .get(
    "/admin/brand/create",
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    BrandController.createBrandPage
  )
  .post(
    "/admin/brand/create",
    checkTokenExpirationMiddleware,
    webAuthenticateToken,
    isAdminWeb,
    BrandController.createBrand
  );

export default brandWebRoute;
