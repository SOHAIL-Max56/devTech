const express = require("express");
const connectdb = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

require("dotenv").config();

// CORS setup
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://98.130.129.15",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database + Server
connectdb()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });