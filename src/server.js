import dotenv from "dotenv";
dotenv.config();

import express from "express";
import configVewEngine from "./config/viewEngine.js";
import webRoute from "./routes/web.js";
import connectDB from "./db/db.js";
import cookieParser from 'cookie-parser';
const app = express();
//config port
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config template engine
configVewEngine(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//static file
app.use(express.static("public"));
app.use("/css", express.static("dist"));

// Declare routes
app.use(webRoute);

// handle 404 - keep this as your last route
app.use(function (req, res, next) {
    res.status(404).render("404.ejs");
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`sever run at http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
