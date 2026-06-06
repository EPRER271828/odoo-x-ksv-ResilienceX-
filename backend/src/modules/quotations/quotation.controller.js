const quotationService = require("./quotation.service");

const ApiResponse = require("../../utils/ApiResponse");

const {
  submitQuotationSchema,
} = require("./quotation.validation");

const getRFQSummary = async (req, res, next) => {
  try {
    const { rfqId } = req.params;

    const data =
      await quotationService.getRFQSummary(
        rfqId
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          "RFQ summary fetched successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const submitQuotation = async (
  req,
  res,
  next
) => {
  try {
    const { error } =
      submitQuotationSchema.validate(req.body);

    if (error) {
      return next(
        new Error(error.details[0].message)
      );
    }

    const quotation =
      await quotationService.submitQuotation(
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          quotationId:
            quotation.quotationId,
        },
        "Quotation submitted successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRFQSummary,
  submitQuotation,
};