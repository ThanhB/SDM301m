import express from "express";
import connectDB from "./db/db.js";
import apiRoutes from "./routes/api.js";
import swagger from "./swagger.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();
const port = 8082;
const hostname = process.env.HOST_NAME || "localhost";
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(apiRoutes);
// swagger(app);

app.use(function (req, res, next) {
  res.status(404).json({ message: "Not Found" });
});

connectDB()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });