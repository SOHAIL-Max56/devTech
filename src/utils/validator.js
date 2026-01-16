const validator = require("validator");

const validateSignupData = (req) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || firstname.length < 3 || firstname.length > 30) {
    throw new Error("First name must be between 3 and 30 characters");
  }
  if (!lastname || lastname.length < 3 || lastname.length > 30) {
    throw new Error("Last name must be between 3 and 30 characters");
  }
  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }
  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = { validateSignupData };