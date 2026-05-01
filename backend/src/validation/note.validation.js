import Joi from "joi";

export const noteAddValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  desc: Joi.string().trim().required().messages({
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required",
  }),
});

export const noteUpdateValidation = Joi.object({
  title: Joi.string().trim().messages({
    "string.empty": "Title cannot be empty",
  }),

  desc: Joi.string().trim().messages({
    "string.empty": "Description cannot be empty",
  }),
});
