const { ConflictText } = require('../utils/consts.js');

class ConflictError extends Error {
  constructor(message = ConflictText) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
