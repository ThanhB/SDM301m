import express from "express";
import BrandController from "../../controller/apiController/brandController.js";
import { authenticateToken } from "../../middleware/jwtAccessToken.js";
import { isAdmin } from "../../middleware/authen.js";
const brandRoute = express.Router();

//get all brands
brandRoute.get("/api/brand",BrandController.getBrands);

//get brand by id
brandRoute.get(
  "/api/brand/:id",
  authenticateToken,
  BrandController.getBrandById
);

//create new brand
brandRoute.post(
  "/api/create-brand", isAdmin, 
  authenticateToken, 
  BrandController.createBrand
);

//update brand
brandRoute.put(
  "/api/update-brand/:id",
  isAdmin,
  authenticateToken,
  BrandController.updateBrand
);

//delete brand
brandRoute.delete(
  "/api/delete-brand/:id",
  isAdmin,
  authenticateToken,
  BrandController.deleteBrand
);

export default brandRoute;
