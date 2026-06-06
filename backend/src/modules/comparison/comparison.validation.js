const Joi = require("joi");

const selectVendorSchema =
  Joi.object({
    rfqId: Joi.string().required(),

    selectedQuotationId:
      Joi.string().required(),

    selectedVendorId:
      Joi.string().required(),
  });

module.exports = {
  selectVendorSchema,
};