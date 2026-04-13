const bcrypt = require("bcrypt");
const User = require("../model/user");
const { validateSignupData } = require("../utils/validator");
const { userAuth } = require("../middleware/auth");
const authRouter = require("express").Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "lax", // or "none" if cross-site
        maxAge: 8 * 60 * 60 * 1000, // 8 hours
      });
      res.status(200).send(user);
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { password, firstname, lastname, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const UnhashedPassword = req.body.password;
    const userData = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      visiblePassword: UnhashedPassword,
    });
    const data = await userData.save();
    const token = await data.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax", // or "none" if cross-site
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });
    res.json({ message: "User signed up successfully", data: data });
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

module.exports = authRouter;
