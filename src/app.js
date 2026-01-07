const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");
const app = express();

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.use("/admin/delete-user", (req, res) => {
  console.log("Delete User Accessed");
  res.send("User deleted successfully.");
});
app.use("/admin/view-reports", (req, res) => {
  console.log("View Reports Accessed");
  res.send("Here are the reports.");
});

app.use("/user/view-profile", (req, res) => {
  console.log("view Profile Accessed");
  res.send("Here is your profile.");
});
app.use("/user/update-profile", (req, res) => {
  console.log("Update Profile Accessed");
  res.send("Profile updated successfully.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
