import dotenv from "dotenv";
dotenv.config();

import express from "express";
import configVewEngine from "./config/viewEngine.js";
import webRoute from "./routes/web.js";
import webconnectDB from "./db/webdb.js";
const app = express();
//config port
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config template engine
configVewEngine(app);

// Declare routes
app.use("/", webRoute);

// handle 404 - keep this as your last route
app.use(function (req, res, next) {
    res.status(404).render("404.ejs");
});

// Connect to the database and start the server
webconnectDB()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`sever run at http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
