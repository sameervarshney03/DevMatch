import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { User } from "../models/user.js";
import { validateUpdatedData } from "../utils/validation.js";
import bcrypt from "bcrypt";

export const profileRouter = express.Router();

//Delete Api
profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = req.user;
    const password = req.body.password;
    const isValid = await user.validatePassword(password);

    if(!isValid){
        throw new Error("Please enter the correct  password.");
    }

    await User.findByIdAndDelete(userId);
    res.json({message:"Deleted successfully."});

  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

//Update Api
profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const data = req.body;

    validateUpdatedData(req);

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      new: true,
    });

    res.json({
      message: "Updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).send(messages.join(", "));
    }
    res.status(400).send(err.message);
  }
});

//Find by id
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//forgot password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) throw new Error("User not found");

    const isValid = await user.validatePassword(oldPassword);
    if (!isValid) {
      throw new Error("Please enter correct previous password.");
    }

    if (oldPassword === newPassword) {
      throw new Error("New password must be different from old password.");
    }
    const password = await bcrypt.hash(newPassword,10);
    user.password = password;
    await user.save(); 

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});