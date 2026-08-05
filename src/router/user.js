const userRouter = require("express").Router();
const User = require("../model/user");
const ConnectionRequest = require("../model/ConnectionRequest");
const { userAuth } = require("../middleware/auth");
const { request } = require("express");

const User_Fields = "firstname lastname gender age photoUrl skills About";
// Get all users
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await ConnectionRequest.find({
      receiverId: loggedInUser._id,
      status: "interested",
    }).populate("senderId", User_Fields);
    res.json({
      message: "Received connection requests",
      data: receivedRequests,
    });
  } catch (error) {
    res.status(401).send("Error " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const myId = loggedInUser._id.toString();

    const connectionRequests = await ConnectionRequest.find({
      status: "accepted",
      $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }],
    })
      .populate("senderId", User_Fields)
      .populate("receiverId", User_Fields);

    const data = connectionRequests
      .map((request) => {
        // Handle both populated and unpopulated cases
        const senderId =
          request.senderId?._id?.toString() || request.senderId?.toString();
        const receiverId =
          request.receiverId?._id?.toString() || request.receiverId?.toString();

        // Return the OTHER user
        if (senderId === myId) {
          return request.receiverId;
        } else if (receiverId === myId) {
          return request.senderId;
        }
        return null;
      })
      .filter((item) => item !== null && item !== undefined);

    // Filter out string IDs (unpopulated)
    const validData = data.filter(
      (item) => typeof item === "object" && item.firstname,
    );

    res.json({ data: validData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    limit = Math.min(limit, 50);
    const connectedUsers = await ConnectionRequest.find({
      $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }],
    }).select("senderId receiverId status");

    const hideUserFromFeed = new Set();
    connectedUsers.forEach((connection) => {
      hideUserFromFeed.add(connection.senderId.toString());
      hideUserFromFeed.add(connection.receiverId.toString());
    });

    const feedUsers = await User.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(hideUserFromFeed) } },
      ],
    })
      .select(User_Fields)
      .skip(skip)
      .limit(limit);
    res.json({ data: feedUsers });
  } catch (error) {
    res.status(401).send("Error " + error.message);
  }
});

module.exports = userRouter;
