const mongoose = require('mongoose');
const { ROLES_LIST } = require('../../config/constants');

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String, required: true, trim: true },
    role: { type: String, enum: ROLES_LIST, required: true },
    country: { type: String, required: true, trim: true },
    additionalInformation: { type: String, default: '' },

    // Password reset
    resetPasswordTokenHash: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

userSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
