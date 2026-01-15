const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 6,
    },
    gender: { type: String, required: true, 
      validate(value){
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid");
    } }},
    age: { type: Number, min: 18 },
    dateOfBirth: { type: Date },
    skills: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
