import Joi from "joi";

const registerValidation = Joi.object({
  username: Joi.string().min(2).trim().required().messages({
    "string.min": "Username must be at least 2 characters",
    "string.empty": "Username is required",
  }),

  email: Joi.string().email().required().trim().lowercase().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
});

const loginValidation = Joi.object({
  email: Joi.string().email().trim().lowercase().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
});

const updateValidation = Joi.object({
  username: Joi.string().trim().min(2).max(250),
  email: Joi.string().trim().email().lowercase(),
  password: Joi.string().min(1),
});

export { registerValidation, loginValidation, updateValidation };
