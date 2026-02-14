const express = require("express");
const connectdb = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");

app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// Connect to the database and start the servver
connectdb()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
