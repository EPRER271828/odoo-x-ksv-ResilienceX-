const Approval = require("./approval.model");

const RFQ = require("../rfqs/rfq.model");

const Vendor = require("../vendors/vendor.model");

const Quotation = require("../quotations/quotation.model");

const ApiError = require("../../utils/ApiError");

const getApproval = async (approvalId) => {
  const approval = await Approval.findOne({
    approvalId,
  });

  if (!approval) {
    throw new ApiError(
      404,
      "Approval not found"
    );
  }

  const rfq = await RFQ.findOne({
    rfqId: approval.rfqId,
  });

  const vendor = await Vendor.findOne({
    vendorId: approval.vendorId,
  });

  const quotation =
    await Quotation.findOne({
      quotationId:
        approval.quotationId,
    });

  const deliverySLA = Math.min(
    ...quotation.lineItemBids.map(
      (item) => item.deliveryDays
    )
  );

  return {
    approvalId:
      approval.approvalId,

    rfqRef: `RFQ-${rfq.title}`,

    targetVendor: vendor.name,

    totalValue:
      quotation.grandTotal,

    deliverySLA: `${deliverySLA} days`,

    ratingScore: "N/A",

    currentStep:
      approval.currentStep,

    workflowSteps:
      approval.workflowSteps,
  };
};

const processAction = async (
  approvalId,
  payload
) => {
  const approval =
    await Approval.findOne({
      approvalId,
    });

  if (!approval) {
    throw new ApiError(
      404,
      "Approval not found"
    );
  }

  if (
    payload.action === "REJECT"
  ) {
    approval.status = "Rejected";

    approval.comments =
      payload.comments;

    await approval.save();

    return {
      success: true,
      currentStatus: "Rejected",
    };
  }

  approval.status =
    "L2 Approved";

  approval.currentStep = 4;

  approval.comments =
    payload.comments;

  approval.poGenerated = true;

  approval.invoiceGenerated = true;

  approval.poNumber = `PO-${Date.now()}`;

  approval.invoiceId = `INV-${Date.now()}`;

  await approval.save();

  return {
    success: true,

    currentStatus:
      "L2 Approved",

    documentTriggers: {
      poGenerated: true,

      poNumber:
        approval.poNumber,

      invoiceGenerated: true,

      invoiceId:
        approval.invoiceId,
    },
  };
};

module.exports = {
  getApproval,
  processAction,
};