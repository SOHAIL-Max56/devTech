const jwt = require("jsonwebtoken");
const User = require("../model/user");


const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login !!");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId } = decoded;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error " + error.message);
  }
};
module.exports = { userAuth };
