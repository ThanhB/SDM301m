import express from 'express';
import BrandController from '../../controller/apiController/brandController.js';

const brandRoute = express.Router();

//get all brands
brandRoute.get("/api/brand", BrandController.getBrands);

//get brand by id
brandRoute.get("/api/brand/:id", BrandController.getBrandById);

//create new brand
brandRoute.post("/api/create-brand", BrandController.createBrand);

export default brandRoute;
