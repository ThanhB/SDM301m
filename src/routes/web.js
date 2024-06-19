import express from 'express';
import authenWebRouter from "./web/authenRoute.js";
import watchWebRouter from "./web/watchRoute.js";
const app = express.Router();

//public route
app.use(authenWebRouter);

app.use(watchWebRouter);
//private route
export default app;