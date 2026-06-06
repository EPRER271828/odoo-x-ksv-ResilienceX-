const RFQ = require("../rfqs/rfq.model");
const Quotation = require("./quotation.model");

const ApiError = require("../../utils/ApiError");

const generateQuotationId = () => {
  return `QT-${Date.now()}`;
};

const getRFQSummary = async (rfqId) => {
  const rfq = await RFQ.findOne({ rfqId });

  if (!rfq) {
    throw new ApiError(404, "RFQ not found");
  }

  return {
    rfqId: rfq.rfqId,
    title: rfq.title,
    deadline: rfq.deadline,
    lineItems: rfq.lineItems,
  };
};

const submitQuotation = async (quotationData) => {
  const rfq = await RFQ.findOne({
    rfqId: quotationData.rfqId,
  });

  if (!rfq) {
    throw new ApiError(404, "RFQ not found");
  }

  const existingQuotation =
    await Quotation.findOne({
      rfqId: quotationData.rfqId,
      vendorId: quotationData.vendorId,
    });

  if (existingQuotation) {
    throw new ApiError(
      400,
      "Quotation already submitted for this RFQ"
    );
  }

  const quotation = await Quotation.create({
    ...quotationData,

    quotationId: generateQuotationId(),

    status: quotationData.isDraft
      ? "Draft"
      : "Submitted",
  });

  return quotation;
};

module.exports = {
  getRFQSummary,
  submitQuotation,
};