const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello from new server!");
});

app.use("/test", (req, res) => {
  res.send("Hello from second middleware!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
