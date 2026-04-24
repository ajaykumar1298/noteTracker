import Joi from "joi";

const registerValidation = Joi.object({
  username: Joi.string().required().trim().min(2).max(250),
  userHandle: Joi.string().required().trim().min(2).max(250),
  email: Joi.string().required().email().trim().lowercase(),
  password: Joi.string().required().min(1),
});

const loginValidation = Joi.object({
  userHandle: Joi.string().trim().min(2).max(250),
  email: Joi.string().trim().email().lowercase(),
  password: Joi.string().required().min(1),
}).or("userHandle", "email");

const updateValidation = Joi.object({
  userHandle: Joi.string().trim().min(2).max(250),
  username: Joi.string().trim().min(2).max(250),
  email: Joi.string().trim().email().lowercase(),
  password: Joi.string().min(1),
});

export { registerValidation, loginValidation, updateValidation };
