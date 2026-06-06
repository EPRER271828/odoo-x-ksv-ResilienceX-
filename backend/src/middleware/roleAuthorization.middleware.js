const ApiError = require('../utils/ApiError');

/**
 * Usage: router.get('/admin', authMiddleware, authorize('Admin'), handler)
 *        router.post('/approve', authMiddleware, authorize('Manager / Approver', 'Admin'), handler)
 */
const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) return next(new ApiError(401, 'Not authenticated.'));
  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action.'));
  }
  next();
};

module.exports = authorize;
