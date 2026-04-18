import Joi from "joi";

export const noteAddValidation = Joi.object({
  title: Joi.string().required().trim(),
  desc: Joi.string().required().trim(),
});

export const noteUpdateValidation = Joi.object({
  title: Joi.string().trim(),
  desc: Joi.string().trim(),
});
