const Joi = require("joi");

const createRFQSchema = Joi.object({
  title: Joi.string().required(),

  category: Joi.string().required(),

  deadline: Joi.date().required(),

  description: Joi.string().required(),

  lineItems: Joi.array()
    .items(
      Joi.object({
        item: Joi.string().required(),
        qty: Joi.number().required(),
        unit: Joi.string().required(),
      })
    )
    .min(1)
    .required(),

  assignedVendors: Joi.array()
    .items(Joi.string())
    .required(),

  isDraft: Joi.boolean().required(),
});

module.exports = {
  createRFQSchema,
};