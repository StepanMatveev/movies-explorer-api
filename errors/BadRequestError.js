const { BadRequestText } = require('../utils/consts.js');

class BadRequestError extends Error {
  constructor(message = BadRequestText) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
