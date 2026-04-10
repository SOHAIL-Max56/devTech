const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      index: true,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastname: {
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
      maxlength: 40,
      minlength: 10,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    visiblePassword: {
      type: String,
      trim: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender`,
      },
      /* 
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        } */
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
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ userId: user._id }, "DEV@TECH#123", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const PasswordHash = user.password;
  const isPasswordValidate = await bcrypt.compare(
    passwordInputByUser,
    PasswordHash,
  );
  return isPasswordValidate;
};

module.exports = mongoose.model("User", userSchema);
