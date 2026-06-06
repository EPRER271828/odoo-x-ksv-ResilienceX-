const RFQ = require("./rfq.model");
const generateRFQId = require("../../utils/generateRFQId");

const createRFQ = async (payload) => {
  const rfqId = await generateRFQId();

  const rfq = await RFQ.create({
    rfqId,
    title: payload.title,
    category: payload.category,
    deadline: payload.deadline,
    description: payload.description,
    lineItems: payload.lineItems,
    assignedVendors: payload.assignedVendors,
    status: payload.isDraft ? "Draft" : "Published",
  });
  

  return rfq;
};

module.exports = {
  createRFQ,
};