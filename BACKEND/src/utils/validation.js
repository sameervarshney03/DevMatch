import { isObjectIdOrHexString } from "mongoose";
import validator from "validator";

export const validateSignUp = (req) => {
  const { firstName, lastName, password, email } = req.body;

  if (firstName.length < 1 || firstName.length > 50) {
    throw new Error("Please enter a valid name.");
  }

  else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.");
  } 
  
  else if (!validator.isEmail(email)) {
    throw new Error("Please enter email correctly.");
  }
};

export const validateUpdatedData = (req) => {
        const data = req.body;

        const allowedFields = [
            "firstName",
            "lastName",
            "age",
            "country",
            "about",
            "skills",
            "photoUrl"
        ];

        const isUpdateAllowed = Object.keys(data).every(key =>
            allowedFields.includes(key)
        );

        if (!isUpdateAllowed) {
            throw new Error("Invalid edit request.");
        }

        if(data?.skills && data?.skills.length>10){
            throw new Error("Maximum 10 skills allowed.");
        }
};
