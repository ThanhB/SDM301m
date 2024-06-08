import mongoose from "mongoose";

mongoose.Promise = global.Promise;

function connectDB() {
  return mongoose
    .connect("mongodb://localhost:27017/SDN301", {})
    .then(() => {
      console.log("MongoDB Connection Succeeded.");
    })
    .catch((err) => {
      console.log("Error in DB connection: " + err);
    });
}

export default connectDB;
