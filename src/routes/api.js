import express from "express";
import BrandController from "../controller/apiController/brandController.js";
import WatchController from "../controller/apiController/watchController.js";
const router = express.Router();

{/* Brand API*/}
//get all brands
router.get("/api/brand", BrandController.getBrands);

//create new brand 
router.post("/api/create-brand", BrandController.createBrand);

//get brand by id
router.get("/api/brand/:id", BrandController.getBrandById);

{/* Watch API*/}
/**
 * @swagger
 * /api/watch:
 *   get:
 *     summary: Retrieve a list of watches
 *     responses:
 *       200:
 *         description: A list of watches.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       watchName:
 *                         type: string
 *                       image:
 *                         type: string
 *                       price:
 *                         type: number
 *                       Automatic:
 *                         type: boolean
 *                       watchDescription:
 *                         type: string
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: string
 *                       brand:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       __v:
 *                         type: integer
 */
//GET all watches
router.get("/api/watch", WatchController.getWatches);

//get watch by id
router.get('/api/watch/:id', WatchController.getWatchById);

//create new watch
router.post("/api/create-watch", WatchController.createWatch);


export default router;
