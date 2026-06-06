const vendorService = require("./vendor.service");
const {
  createVendorSchema,
} = require("./vendor.validation");

const getVendors = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const vendors = await vendorService.getVendors(
      search,
      status
    );

    return res.status(200).json(vendors);
  } catch (error) {
    next(error);
  }
};

const createVendor = async (req, res, next) => {
  try {
    const { error } = createVendorSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const vendor = await vendorService.createVendor(
      req.body
    );

    return res.status(201).json({
      success: true,
      vendorId: vendor.vendorId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVendors,
  createVendor,
};