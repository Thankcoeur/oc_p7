const Joi = require("joi");

exports.password = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    )
    .required(),
});

exports.username = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
});

exports.email = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

exports.content = Joi.object({
  content: Joi.string().min(5),
});
