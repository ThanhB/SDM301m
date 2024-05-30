const mongoose = require("mongoose");

const memberSchema = new Schema(
  {
    membername: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
