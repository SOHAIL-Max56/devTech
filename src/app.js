const express = require("express");
const connectdb = require("./config/database");
const User = require("./model/user");
const app = express();

app.post("/signup", async (req, res) => {
  // Create a new user instance
  const userData = new User({
    name: "Sohail",
    lastName: "Ahmad",
    email: "sohailAhmad@example.com",
    password: "password123",
    gender: "male",
    age: 20,
  });
  // Save the user to the database
  try {              // Added try-catch for error handling
    await userData.save();
    res.send("User signed up successfully");
    console.log("User data saved:");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
});

connectdb()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
