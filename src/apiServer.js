import express from "express";
import connectDB from "./db/db.js";
import apiRoutes from "./routes/api.js";
import swagger from "./swagger.js";
const app = express();
const port = 8082;
const hostname = process.env.HOST_NAME || "localhost";

app.use(express.json());

app.use(apiRoutes);

app.use(function (req, res, next) {
  res.status(404).json({ message: "Not Found" });
});

swagger(app);

connectDB()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });