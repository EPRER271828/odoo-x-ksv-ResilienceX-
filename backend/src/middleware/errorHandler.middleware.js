const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production') console.error(err);
  res.status(statusCode).json({ success: false, error: message });
};

module.exports = errorHandler;
