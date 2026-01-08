const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String },
  age: { type: Number },
  dateOfBirth: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
