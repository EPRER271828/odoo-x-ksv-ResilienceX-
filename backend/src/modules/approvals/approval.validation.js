const Joi = require("joi");

const actionSchema =
  Joi.object({
    action: Joi.string()
      .valid(
        "APPROVE",
        "REJECT"
      )
      .required(),

    comments:
      Joi.string().required(),
  });

module.exports = {
  actionSchema,
};