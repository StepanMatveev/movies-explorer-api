const { UnathorizedText } = require('../utils/consts.js');

class UnauthorizedError extends Error {
  constructor(message = UnathorizedText) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
