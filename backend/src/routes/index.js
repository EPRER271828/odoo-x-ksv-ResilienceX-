const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const vendorRoutes = require('../modules/vendors/vendor.routes');
const rfqRoutes = require("../modules/rfqs/rfq.routes");
const quotationRoutes = require(
  "../modules/quotations/quotation.routes"
);
const comparisonRoutes = require(
  "../modules/comparison/comparison.routes"
);
const approvalRoutes = require(
  "../modules/approvals/approval.routes"
);

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/vendors', vendorRoutes);
router.use("/rfqs", rfqRoutes); 
router.use("/quotations",quotationRoutes);
router.use("/comparison",comparisonRoutes);
router.use("/approvals",approvalRoutes);

// Future modules:
// router.use('/users', require('../modules/users/users.routes'));
// router.use('/vendors', require('../modules/vendors/vendors.routes'));
// ...

module.exports = router;
