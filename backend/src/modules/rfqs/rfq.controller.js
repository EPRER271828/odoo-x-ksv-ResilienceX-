const rfqService = require("./rfq.service");
const { createRFQSchema } = require("./rfq.validation");

const createRFQ = async (req, res, next) => {
  try {
    const { error } = createRFQSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const rfq = await rfqService.createRFQ(
      req.body
    );

    return res.status(201).json({
      success: true,
      rfqId: rfq.rfqId,
      message:
        "RFQ created successfully and distribution email alerts dispatched to selected suppliers.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRFQ,
};