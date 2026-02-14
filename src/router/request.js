const {userAuth} = require("../middleware/auth");
const requestRouter = require('express').Router();

requestRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Error " + error.message);
  }
});

module.exports = requestRouter;