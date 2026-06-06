const approvalService = require(
  "./approval.service"
);

const ApiResponse = require(
  "../../utils/ApiResponse"
);

const {
  actionSchema,
} = require(
  "./approval.validation"
);

const getApproval = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await approvalService.getApproval(
        req.params.approvalId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        data,
        "Approval details fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

const processAction = async (
  req,
  res,
  next
) => {
  try {
    const { error } =
      actionSchema.validate(req.body);

    if (error) {
      return next(
        new Error(
          error.details[0].message
        )
      );
    }

    const data =
      await approvalService.processAction(
        req.params.approvalId,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        data,
        "Approval action processed successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApproval,
  processAction,
};