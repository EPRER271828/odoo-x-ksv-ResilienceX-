const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const msg = error.details.map((d) => d.message).join(', ');
    return next(new ApiError(400, `Validation Error: ${msg}`));
  }
  req.body = value;
  next();
};

module.exports = validate;
