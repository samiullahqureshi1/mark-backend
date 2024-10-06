import Joi from "joi";

export const regiterValidationSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
    dateOfBirth: Joi.date().less('now').required().label("Date of Birth"),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).label("Phone Number"),
});

export const logInValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});
