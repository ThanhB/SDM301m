import express from 'express';
import { getHomePage, getABC } from '../controller/homeController.js';

const router = express.Router();

//public route
router.get('/', getHomePage)
router.get('/abc', getABC)

//private route
router.use(authen)

function authen(req, res, next){
    console.log("Check authen")
    next()
}

export default router;