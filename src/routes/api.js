import express from "express";
import BrandController from "../controller/apiController/brandController.js";
import WatchController from "../controller/apiController/watchController.js";
import AuthenController from "../controller/apiController/authenController.js";
const router = express.Router();

{
  /* private router */
}

//get list memeber
router.get("/api/accounts", AuthenController.getMembers);

{
  /* Authen API */
}

{
  /* Brand API*/
}

//create new brand
router.post("/api/create-brand", BrandController.createBrand);

{
  /* Watch API*/
}

//create new watch
router.post("/api/create-watch", WatchController.createWatch);

{
  /* Public router */
}

{
  /* Authen api*/
}

//login
router.post("/api/authen/login", AuthenController.login);

//register
router.post("/api/authen/register", AuthenController.register);

{
  /* brand api*/
}

//get all brands
router.get("/api/brand", BrandController.getBrands);

//get brand by id
router.get("/api/brand/:id", BrandController.getBrandById);

{
  /* watch api*/
}

//GET all watches
router.get("/api/watch", WatchController.getWatches);
//get watch by id
router.get("/api/watch/:id", WatchController.getWatchById);

export default router;
