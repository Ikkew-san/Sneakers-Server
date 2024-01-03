const Joi = require("joi");

function SignupValidation(obj) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(obj);
  return error;
}

module.exports = SignupValidation;
