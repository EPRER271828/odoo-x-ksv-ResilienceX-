const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const vendorRoutes = require('../modules/vendors/vendor.routes');
const rfqRoutes = require("../modules/rfqs/rfq.routes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/vendors', vendorRoutes);
router.use("/rfqs", rfqRoutes); 

// Future modules:
// router.use('/users', require('../modules/users/users.routes'));
// router.use('/vendors', require('../modules/vendors/vendors.routes'));
// ...

module.exports = router;
