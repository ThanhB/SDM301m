import express from "express";
import watchRouter from "./api/watchRoute.js";
import brandRoute from "./api/brandRoute.js";
import authenRouter from "./api/authenRoute.js";
import memberRoute from "./api/memberRoute.js";
import commentRoute from "./api/commentRoute.js";
const router = express.Router();

router.use(authenRouter);
router.use(memberRoute);
router.use(watchRouter);
router.use(commentRoute);
router.use(brandRoute);

export default router;
