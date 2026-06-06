const nodemailer = require('nodemailer');
const env = require('../config/env');

// Dev fallback: logs the email to console if SMTP isn't configured.
let transporter = null;
if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

const sendEmail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    console.log('📧 [DEV EMAIL]', { to, subject, text: text || html });
    return { mocked: true };
  }
  return transporter.sendMail({
    from: env.SMTP_FROM || 'no-reply@vendorbridge.com',
    to,
    subject,
    html,
    text,
  });
};

const sendPasswordResetEmail = async (to, resetUrl) => {
  const subject = 'VendorBridge — Reset your password';
  const html = `
    <p>Hello,</p>
    <p>You requested a password reset. Click the link below to set a new password. This link expires in 15 minutes.</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>If you did not request this, ignore this email.</p>
  `;
  return sendEmail({ to, subject, html, text: `Reset your password: ${resetUrl}` });
};

module.exports = { sendEmail, sendPasswordResetEmail };
