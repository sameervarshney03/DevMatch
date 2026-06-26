import mongoose from "mongoose";
import { User } from "./user.js";

const connectionRequest = new mongoose.Schema({
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:["accepted","skipped","rejected","requested"],
            message:`{VALUE} this status is not allowed.`
        }
    }
},{
    timestamps:true
})

connectionRequest.pre("save", async function () {
    const connectionRequest = this;

    if (connectionRequest.fromUser.equals(connectionRequest.toUser)) {
        throw new Error("You can't send a connection request to yourself.");
    }
    
    // In async middleware, if you don't throw an error, 
    // Mongoose treats it as 'next()' was called.
});


export const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequest);
