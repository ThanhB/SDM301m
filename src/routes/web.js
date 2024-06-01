import express from 'express';
import { getHomePage, getABC } from '../controller/homeController.js';

const app = express.Router();

//public route
app.get('/', getHomePage)
app.get('/abc', getABC)

//private route
export default app;