const Joi = require("joi");

const submitQuotationSchema = Joi.object({
  rfqId: Joi.string().required(),

  vendorId: Joi.string().required(),

  lineItemBids: Joi.array()
    .items(
      Joi.object({
        item: Joi.string().required(),
        qty: Joi.number().required(),
        unitPrice: Joi.number().required(),
        total: Joi.number().required(),
        deliveryDays: Joi.number().required(),
      })
    )
    .min(1)
    .required(),

  taxRatePercentage: Joi.number().required(),

  subtotal: Joi.number().required(),

  gstAmount: Joi.number().required(),

  grandTotal: Joi.number().required(),

  paymentTerms: Joi.string().allow(""),

  isDraft: Joi.boolean().required(),
});

module.exports = {
  submitQuotationSchema,
};