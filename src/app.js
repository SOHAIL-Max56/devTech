const express = require("express");
const connectdb = require("./config/database");
const User = require("./model/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Create a new user instance

  const userData = new User(req.body);
  // Save the user to the database
  try {
    // Added try-catch for error handling
    await userData.save();
    res.send("User signed up successfully");
    console.log("User data saved:");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
});

app.get("/users", async (req, res) => {
  const userEmail = req.body.email;
  try {
    // Finding the user which has same email
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
// To get all users data
app.get("/feed", async (req, res) => {
  const allusers = await User.find();
  try {
    res.status(200).send(allusers);
  } catch (error) {
    console.error("Error fetching all user data:", error);
  }
});
// Connect to the database and start the servver
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
