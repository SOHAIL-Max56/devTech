const express = require("express");
const connectdb = require("./config/database");
const User = require("./model/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validator");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { password, firstname, lastname, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await userData.save();
    res.send("User signed up successfully");
    console.log("User data saved: ", hashedPassword);
  } catch (error) {
    res.status(400).send("Error " + error.message);
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
    res.status(400).send("Error fetching user data");
  }
});
// To get all users data
app.get("/feed", async (req, res) => {
  const allusers = await User.find();
  try {
    res.status(200).send(allusers);
  } catch (error) {
    res.status(400).send("Error fetching all user data");
  }
});
// Deleting user by id
app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete({ _id: userId });
    res.status(200).send("User deleted successfully");
    console.log("User get deleted: ", userId);
  } catch (error) {
    res.status(400).send("Error deleting user");
  }
});
// Update user by id
app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  try {
    const updatedUser = ["password", "About", "skills", "age"];
    const validateUpdate = Object.keys(req.body).every((key) =>
      updatedUser.includes(key)
    );
    if (!validateUpdate) {
      return res.status(400).send("Invalid update fields");
    }
    console.log("User get Updated: ", userId);
    await User.findByIdAndUpdate(userId, req.body);
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send("Error updating user");
    console.error("Error updating user:", error);
  }
});

// find the user and Update
app.patch("/findAndUpdate", async (req, res) => {
  const { userEmail, ...updateData } = req.body;
  try {
    // Doing API validation for all the fields before updating
    const updatedUser = ["password", "About", "skills", "age"];
    const validateUpdate = Object.keys(updateData).every((key) =>
      updatedUser.includes(key)
    );
    if (!validateUpdate) {
      return res.status(400).send("Invalid update fields");
    }
    await User.findOneAndUpdate({ email: userEmail }, updateData, {
      new: true,
    });
    console.log(req.body);
    res.status(200).send("User found and updated successfully");
  } catch (error) {
    console.error("Error finding and updating user:", error);
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
