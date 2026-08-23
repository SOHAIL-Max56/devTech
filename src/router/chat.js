const express = require("express");
const { userAuth } = require("../middleware/auth");
const Chat = require("../model/chat");
const chatRouter = express.Router();

chatRouter.get("/chat/:receiverId", userAuth, async (req, res) => {
  const { receiverId } = req.params;
  const currentUserId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, receiverId] },
    }).populate({
      path: "messages.senderId",
      select: "firstname lastname",
    });
    if (!chat) {
      chat = new Chat({
        participants: [currentUserId, receiverId],
        messages: [],
      });

      await chat.save();
      chat.messages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      );
    }
    res.json({ success: true, data: chat });
  } catch (error) {
    console.error("Error fectching chat: ", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = chatRouter;
