const profileRouter = require("express").Router();
const { userAuth } = require("../middleware/auth");
const User = require("../model/user");
const { validateprofileData } = require("../utils/validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Error " + error.message);
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (!validateprofileData(req)) {
      throw new Error("Invalid Profile data");
    }
    const loggedIn = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedIn[key] = req.body[key];
    });
    await loggedIn.save();
    res.json({
      message: `${loggedIn.firstname} Profile Updated successfully !`,
      data: loggedIn,
    });
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});
// forgot password 
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const loggedIn = req.user;
    if (!oldPassword || !newPassword) {
      throw new Error("Both old and new passwords are required");
    }
    const isMatch = await loggedIn.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }
    loggedIn.password = newPassword;
    await loggedIn.save();
    res.send({
      message: "Password updated successfully",
    });
  }
  catch (error) {
    res.status(400).send("Error" + error.message);
  }
})

module.exports = profileRouter;
