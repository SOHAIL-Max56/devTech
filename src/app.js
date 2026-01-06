const express = require("express");

const app = express();

app.use("/test/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ FirstName: "John", LastName: "Doe" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
