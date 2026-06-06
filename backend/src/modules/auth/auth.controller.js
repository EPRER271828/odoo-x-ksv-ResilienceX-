const asyncHandler = require('../../middleware/asyncHandler.middleware');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  res.status(201).json({ success: true, ...data });
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  res.status(200).json({ success: true, ...data });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const data = await authService.forgotPassword(req.body);
  res.status(200).json({ success: true, ...data });
});

const resetPassword = asyncHandler(async (req, res) => {
  const data = await authService.resetPassword(req.body);
  res.status(200).json({ success: true, ...data });
});

module.exports = { register, login, me, forgotPassword, resetPassword };
