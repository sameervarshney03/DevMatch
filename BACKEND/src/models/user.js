import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength:1,
        maxlength:50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength:5,
        maxlength:254,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter the correct email."+value);
            }
        }
    },
    lastName:{
        type: String,
        minlength:1,
        maxlength:50
    },
    age:{
        type:Number,
        min:12,
    },
    password:{
        type:String,
        required: true,
        minlength:8,
        maxlength:72,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password.")
            }
        }
    },
    country:{
        type:String,
        default: "India",
        validate(value){
            if(!["India"].includes(value)){
                throw new Error("Indian developers are only allowed for now.")
            }
        },
        maxlength:30
    },
    about:{
        type:String,
        maxlength:1000
    },
    skills:{
        type:[String],

    },
    photourl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter right url.");
            }
        },
        default:"https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80",

    }
},
{
    timestamps:true
});

userSchema.methods.getJwt = async function(){
    const userData = this;
    const token = await jwt.sign({_id:userData._id}, process.env.JWT_SECRET, {expiresIn:'10d'});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const userData = this;
    const isPasswordCorrect = await bcrypt.compare(
                passwordInputByUser,
                userData.password
    );
    return isPasswordCorrect;
}

export const User = mongoose.model("User",userSchema);