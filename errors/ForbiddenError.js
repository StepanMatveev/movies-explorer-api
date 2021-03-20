const { ForbidenText } = require('../utils/consts.js');

class ForbiddenError extends Error {
  constructor(message = ForbidenText) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
