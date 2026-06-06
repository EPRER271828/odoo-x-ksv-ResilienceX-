const Vendor = require("./vendor.model");
const generateVendorId = require("../../utils/generateVendorId");

const getVendors = async (search, status) => {
  const filter = {};

  if (status) {
    filter.status = new RegExp(`^${status}$`, "i");
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { gstNo: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  return Vendor.find(filter).sort({ createdAt: -1 });
};

const createVendor = async (payload) => {
  const vendorId = await generateVendorId();

  const vendor = await Vendor.create({
    vendorId,
    ...payload,
  });

  return vendor;
};

module.exports = {
  getVendors,
  createVendor,
};