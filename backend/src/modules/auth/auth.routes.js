const express = require('express');
const controller = require('./auth.controller');
const validate = require('../../middleware/validation.middleware');
const authMiddleware = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/roleAuthorization.middleware');
const { authLimiter } = require('../../middleware/rateLimiter.middleware');
const {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', authLimiter, validate(loginSchema), controller.login);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), controller.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), controller.resetPassword);

router.get('/me', authMiddleware, controller.me);

// Example of role-protected route
router.get('/admin-only', authMiddleware, authorize('Admin'), (req, res) => {
  res.json({ success: true, message: `Welcome Admin ${req.user.firstName}` });
});

module.exports = router;
