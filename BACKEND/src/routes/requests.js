import express from "express";
import { ConnectionRequest } from "../models/connectionRequest.js";
import { User } from "../models/user.js";
import { userAuth } from "../middlewares/auth.js";

export const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userID",
  userAuth,
  async (req, res) => {
    try {
      const fromUser = req.user._id;
      const toUser = req.params.userID;
      const status = req.params.status;

      const allowedStatus = ["requested", "skipped"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Can't set that status.");
      }

      const userExist = User.findById(toUser);
      if (!userExist) {
        throw new Error("User does not exist.");
      }

      const isAlready = await ConnectionRequest.findOne({
        $or: [
          { fromUser: fromUser, toUser: toUser },
          { fromUser: toUser, toUser: fromUser },
        ],
      });

      if (isAlready) {
        throw new Error("This request is already there.");
      }

      const connectionRequest = new ConnectionRequest({
        fromUser,
        toUser,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Request send successfully.",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedUser = req.user._id;
      const requestId = req.params?.requestId;
      const status = req.params?.status;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Status modification is not allowed.");
      }

      const requestExist = await ConnectionRequest.findOne({
        _id: requestId,
        toUser: loggedUser,
        status: "requested",
      });

      if (!requestExist) {
        throw new Error("Request does not exist.");
      }

      const fromUserExist = await User.findById(requestExist.fromUser);

      if (!fromUserExist) {
        throw new Error("Request does not exist.");
      }

      if (status === "rejected") {
        await ConnectionRequest.findByIdAndDelete(requestId);
        return res.json({
          message: "Request rejected and deleted from database.",
        });
      } else {
        requestExist.status = status;
        const data = await requestExist.save();
        res.json({
          message: `Request ${status}.`,
          data,
        });
      }

    } catch (err) {
      res.status(401).send("ERROR: " + err.message);
    }
  }
);
