import { authModel } from "../model/auth";
import jwt from 'jsonwebtoken'
import { logInValidationSchema, regiterValidationSchema } from "../validations/auth";

const createToken = (payLoad) => {
    const token = jwt.sign({ payLoad }, process.env.SECRET_KEY, {
      expiresIn: "175d",
    });
    return token;
  };


  export const signIn = async (req, res) => {
    try {
      const { error, value } = logInValidationSchema.validate(req.body);
  
      if (error) {
        throw new Error(error.details[0].message);
      }
      const { email, password } = req.body;
      // checking email already exist
      const emailExist = await authModel.findOne({
        email: email,
      });
  
      if (!emailExist) {
        throw new Error("user does not exist with this email");
      }
      // Compare passwords
      const isMatch = await emailExist.comparePassword(password);
      if (!isMatch) {
        throw new Error("password does not match");
      }
      const token = createToken({ _id: emailExist._id });
      res.send({
        message: "successfully logIn",
        token,
        data: emailExist,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };


  export const signUp = async (req, res) => {
    try {
      const { error, value } = regiterValidationSchema.validate(req.body);
  
      if (error) {
        throw new Error(error.details[0].message);
      }
  
      // checking email already exist
      const userExist = await authModel.findOne({
        email: req.body.email,
      });
  
      if (userExist) {
        throw new Error("user already exist with this email");
      }
  
      // create new user
      const newUser = new authModel(req.body);
      const saveUser = await newUser.save();
      const token = createToken({ _id: saveUser._id });
      res.send({
        message: "successfully register",
        token,
        data: saveUser,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };