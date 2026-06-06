class ApiResponse {
  constructor(statusCode, data = {}, message = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    Object.assign(this, data);
  }
}
module.exports = ApiResponse;
