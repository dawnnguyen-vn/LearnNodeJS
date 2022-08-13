const Joi = require("joi");

const validateUser = (data) => {
  const userSchema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp("gmail.com$"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return userSchema.validate(data);
};

const validatePost = (data) => {
  const postSchema = Joi.object({
    title: Joi.required(),
    description: Joi.string().allow(null, ''),
    url: Joi.string().allow(null, ''),
    status: Joi.string().allow(null, ''),
  });
  return postSchema.validate(data);
};

module.exports = {
  validateUser,
  validatePost,
};
