import express from "express";
import BrandController from "../../controller/apiController/brandController.js";
import { authenticateToken } from "../../middleware/jwtAccessToken.js";
const brandRoute = express.Router();

//get all brands
brandRoute.get("/api/brand", authenticateToken, BrandController.getBrands);

//get brand by id
brandRoute.get(
  "/api/brand/:id",
  authenticateToken,
  BrandController.getBrandById
);

//create new brand
brandRoute.post(
  "/api/create-brand",
  authenticateToken,
  BrandController.createBrand
);

export default brandRoute;
