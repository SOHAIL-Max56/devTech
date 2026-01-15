const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      maxlength: 25,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    age: { type: Number, min: 18, maxlength: 2 },
    dateOfBirth: { type: Date },
    skills: { type: [String], maxlength: 10 },
    About: {
      type: String,
      trim: true,
      default: "Tell me about yourself",
      maxlength: 250,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
