const adminAuth = (req, res, next) => {
  console.log("Admin Login is checked");
  const token = "xyz123"; // Simulated token generation
  const IsAdminauthenticated = token === "xyz123"; // Simulated authentication check
  if (!IsAdminauthenticated) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth =  (req, res, next) => {
  console.log("User Login is checked");
  const token = "abc456"; // Simulated token generation
  const IsUserauthenticated = token === "abc456"; // Simulated authentication check
  if (!IsUserauthenticated) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
}
module.exports = {adminAuth, userAuth};