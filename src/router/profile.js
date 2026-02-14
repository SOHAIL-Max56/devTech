const profileRouter = require("express").Router();
const { userAuth } = require("../middleware/auth");
const User = require("../model/user");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Error " + error.message);
  }
});

module.exports = profileRouter;