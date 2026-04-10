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

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { senderId: loggedInUser._id, status: "accepted" },
        { receiverId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("senderId", User_Fields)
      .populate("receiverId", User_Fields);

    const data = connectionRequests.map((request) => {
      // Check if senderId is populated (has _id as ObjectId with properties)
      const senderIsPopulated = request.senderId && request.senderId.firstname;
      // Check if receiverId is populated
      const receiverIsPopulated =
        request.receiverId && request.receiverId.firstname;

      let connectionUser;

      // Determine which one is the OTHER user (not logged in user)
      if (request.senderId._id.toString() === loggedInUser._id.toString()) {
        connectionUser = request.receiverId; // Return receiver
      } else {
        connectionUser = request.senderId; // Return sender
      }

      // Only return if the connection user is properly populated
      return connectionUser && connectionUser.firstname ? connectionUser : null;
    });

    // Filter out nulls (deleted users)
    const validData = data.filter((item) => item !== null);

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
