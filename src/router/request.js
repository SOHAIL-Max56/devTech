const User = require("../model/user");
const { userAuth } = require("../middleware/auth");
const requestRouter = require("express").Router();
const ConnectionRequest = require("../model/ConnectionRequest");

requestRouter.post(
  "/profile/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const receiverId = req.params.receiverId;
      const senderId = req.user._id;

      // Status only be "interested", "ignored"
      const StatusTypes = ["interested", "ignored"];
      if (!StatusTypes.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      // Checking if receiver exist in database
      const ReceiverExist = await User.findById(receiverId);
      if (!ReceiverExist) {
        return res.status(404).json({ message: "Receiver not found" });
      }

      const connectionRequest = new ConnectionRequest({
        senderId,
        receiverId,
        status,
      });

      // Checking exsting connection request
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" });
      }

      await connectionRequest.save();
      res.json({
        message:
          req.user.firstname +
          " is " +
          status +
          " in you " +
          ReceiverExist.firstname,
        data: connectionRequest,
      });
    } catch (error) {
      res.status(401).send("Error " + error.message);
    }
  },
);

module.exports = requestRouter;
