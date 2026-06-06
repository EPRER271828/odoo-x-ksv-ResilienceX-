const comparisonService =
  require("./comparison.service");

const ApiResponse =
  require("../../utils/ApiResponse");

const {
  selectVendorSchema,
} = require("./comparison.validation");

const getComparison =
  async (
    req,
    res,
    next
  ) => {
    try {
      const data =
        await comparisonService.getComparison(
          req.params.rfqId
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            data,
            "Comparison fetched successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

const selectVendor =
  async (
    req,
    res,
    next
  ) => {
    try {
      const { error } =
        selectVendorSchema.validate(
          req.body
        );

      if (error) {
        return next(
          new Error(
            error.details[0]
              .message
          )
        );
      }

      const data =
        await comparisonService.selectVendor(
          req.body
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            data,
            "Vendor selected successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getComparison,
  selectVendor,
};