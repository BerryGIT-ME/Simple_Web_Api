import joi from "joi";

// prototypes for validating inputs
export const loginInputs = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

export const patchInputs = joi.object({
  data: joi.object().required(),
  patch: joi.array().required(),
});

export const thumbnailInputs = joi.string().required();
