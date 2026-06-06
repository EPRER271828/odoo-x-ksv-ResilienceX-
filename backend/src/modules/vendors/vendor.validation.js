const Joi = require("joi");

const createVendorSchema = Joi.object({
  name: Joi.string().required(),

  category: Joi.string().required(),

  gstNo: Joi.string().required(),

  contactNo: Joi.string().required(),

  status: Joi.string()
    .valid("Active", "Pending", "Blocked")
    .required(),
});

module.exports = {
  createVendorSchema,
};