const { NotFoundText } = require('../utils/consts.js');

class NotFoundError extends Error {
  constructor(message = NotFoundText) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
