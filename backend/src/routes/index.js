const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');

const router = express.Router();

router.use('/auth', authRoutes);

// Future modules:
// router.use('/users', require('../modules/users/users.routes'));
// router.use('/vendors', require('../modules/vendors/vendors.routes'));
// ...

module.exports = router;
