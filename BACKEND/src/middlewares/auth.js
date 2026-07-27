import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Please login again.");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData._id);
    if (!user) throw new Error("User not found.");
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send("ERROR:" + err.message);
  }
};