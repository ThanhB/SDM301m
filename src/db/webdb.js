import mongoose from "mongoose";

mongoose.Promise = global.Promise;

function webconnectDB() {
  return mongoose
    .connect("mongodb://localhost:27017/admin", {})
    .then(() => {
      console.log("MongoDB Connection Succeeded.");
    })
    .catch((err) => {
      console.log("Error in DB connection: " + err);
    });
}

export default webconnectDB;