const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const User = require('../modules/auth/auth.model');

const authMiddleware = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication token missing.');
    }
    const decoded = verifyToken(header.split(' ')[1]);
    const user = await User.findById(decoded.sub).select('-password');
    if (!user) throw new ApiError(401, 'User no longer exists.');
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Invalid or expired token.'));
    }
    next(err);
  }
};

module.exports = authMiddleware;
