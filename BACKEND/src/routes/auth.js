import express from "express";
import {User} from "../models/user.js";
import {validateSignUp} from "../utils/validation.js";
import bcrypt from "bcrypt";

export const authRouter = express.Router();

//signup api
authRouter.post("/signup",async (req,res)=>{
    try{
        const {firstName,lastName,password,email} = req.body;
        //Validating the user info
        validateSignUp(req);

        //password encryption
        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            password: passwordHash,
            email,
        });

        await user.save();
        res.send("SignUp complete.");

    } catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
    
})

//login api
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = userData.validatePassword(password);

        if(isPasswordCorrect){
            const token = await userData.getJwt();
            res.cookie("token",token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            res.send(userData);
        }

        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

//logout api
authRouter.post("/logout", async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.send();
});
