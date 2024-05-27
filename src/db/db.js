const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
async function connect() {
  try {
    let connection = await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connect mongoose successfully", 200);
    return connection;
  } catch (error) {
    console.log("Error while connecting", error);
  }
}
module.exports = connect;