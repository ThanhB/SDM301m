import express from 'express';
import authenWebRouter from "./web/authenRoute.js";
import watchWebRouter from "./web/watchRoute.js";
import memberWebRouter from "./web/memberRoute.js";
const app = express.Router();

//public route
app.use(authenWebRouter);

app.use(watchWebRouter);

app.use(memberWebRouter);
//private route
export default app;