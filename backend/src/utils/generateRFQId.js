const RFQ = require("../modules/rfqs/rfq.model");

const generateRFQId = async () => {
  const count = await RFQ.countDocuments();

  return `RFQ-${new Date().getFullYear()}-${String(
    count + 1
  ).padStart(4, "0")}`;
};

module.exports = generateRFQId;