const mongoose = require("mongoose");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  { brandName: String },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
