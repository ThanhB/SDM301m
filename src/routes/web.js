import express from 'express';
import authenWebRouter from "./web/authenRoute.js";

const app = express.Router();

//public route
app.use(authenWebRouter);


//private route
export default app;