const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('./auth.model');
const ApiError = require('../../utils/ApiError');
const { signToken } = require('../../utils/jwt');
const { sendPasswordResetEmail } = require('../../utils/emailService');
const env = require('../../config/env');

const generateUserId = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `USR-${year}-${rand}`;
};

const register = async (payload) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new ApiError(409, 'An account linked to this email address is already active in the ERP registry.');
  }
  const hashed = await bcrypt.hash(payload.password, env.BCRYPT_SALT_ROUNDS);

  let userId;
  for (let i = 0; i < 5; i++) {
    userId = generateUserId();
    // eslint-disable-next-line no-await-in-loop
    const clash = await User.findOne({ userId });
    if (!clash) break;
  }

  const user = await User.create({ ...payload, password: hashed, userId });
  return { message: 'User configuration profile provisioned successfully.', userId: user.userId };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(404, 'No account registered under this email identifier.');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new ApiError(401, 'Invalid password. Access denied.');

  const token = signToken({ sub: user._id.toString(), role: user.role });
  return {
    token,
    user: {
      id: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    },
  };
};

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });

  // Always return the same response to avoid leaking which emails exist
  const genericResponse = {
    message: 'If an account exists for this email, a reset link has been sent.',
  };
  if (!user) return genericResponse;

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  user.resetPasswordTokenHash = tokenHash;
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  await user.save();

  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${rawToken}`;
  await sendPasswordResetEmail(user.email, resetUrl);

  return genericResponse;
};

const resetPassword = async ({ token, password }) => {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+resetPasswordTokenHash +resetPasswordExpires');

  if (!user) throw new ApiError(400, 'Password reset link is invalid or has expired.');

  user.password = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
  user.resetPasswordTokenHash = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: 'Password has been reset successfully. Please log in.' };
};

module.exports = { register, login, forgotPassword, resetPassword };
