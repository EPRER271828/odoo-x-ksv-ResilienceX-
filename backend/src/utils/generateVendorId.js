const Vendor = require("../modules/vendors/vendor.model");

const generateVendorId = async () => {
  const count = await Vendor.countDocuments();

  return `VND-${String(count + 1).padStart(3, "0")}`;
};

module.exports = generateVendorId;