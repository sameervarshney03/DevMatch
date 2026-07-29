import express from "express";
import { User } from "../models/user.js";
import { ConnectionRequest } from "../models/connectionRequest.js";
import { userAuth } from "../middlewares/auth.js";

export const userRouter = express.Router();
const safeData = "firstName lastName country skills about photourl";

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const requests = await ConnectionRequest.find({
      toUser: loggedUserId,
      status: "requested",
    }).populate("fromUser", safeData);

    const validRequests = requests.filter((req) => req.fromUser !== null);
    
    res.json({
      message: "Here are your requests.",
      requests: validRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const connections = await ConnectionRequest.find({
      $or: [
        { toUser: loggedUserId, status: "accepted" },
        { fromUser: loggedUserId, status: "accepted" },
      ],
    })
      .populate("fromUser", safeData)
      .populate("toUser", safeData);
    const validateConnections = connections.filter(
      (req) => req.fromUser && req.toUser
    );
    const showConnections = validateConnections.map((con) => {
      if (con.fromUser._id.toString() === loggedUserId.toString()) {
        return con.toUser;
      }
      return con.fromUser;
    });
    res.json({
      message: "Here are your connections",
      connections: showConnections,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

userRouter.post("/user/connection/remove/:userId", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const targetUserId = req.params.userId;

    const connection = await ConnectionRequest.findOneAndDelete({
      $or: [
        { fromUser: loggedUserId, toUser: targetUserId, status: "accepted" },
        { fromUser: targetUserId, toUser: loggedUserId, status: "accepted" },
      ]
    });

    if (!connection) {
      throw new Error("Connection not found.");
    }

    res.json({ message: "Connection removed successfully." });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1)*limit;

    const connections = await ConnectionRequest.find({
      $or: [{ toUser: loggedUserId }, { fromUser: loggedUserId }],
    });

    const excludeUserIds = new Set();

    connections.forEach((con) => {
      if (con.fromUser.toString() !== loggedUserId.toString()) {
        excludeUserIds.add(con.fromUser.toString());
      }
      if (con.toUser.toString() !== loggedUserId.toString()) {
        excludeUserIds.add(con.toUser.toString());
      }
    });

    excludeUserIds.add(loggedUserId.toString());

    const feedUsers = await User.find({
      _id: { $nin: Array.from(excludeUserIds) },
    }).select(safeData).skip(skip).limit(limit);

    res.json({
      message: "Your feed is refreshed.",
      users: feedUsers,
    });
  } catch (err) {
    res.status(400).json({
      message: `ERROR: ${err.message}`,
    });
  }
});
