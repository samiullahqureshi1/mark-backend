import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const authSchema=new mongoose.Schema({
    fistName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    dateOfBirth:{
        type:Number
    },
    phoneNumber:{
        type:Number
    }
})
authSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  });
  
  // Method to compare password for login
  authSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

export const authModel=mongoose.model('users',authSchema)