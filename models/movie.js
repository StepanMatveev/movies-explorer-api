const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: (props) => `${props.value} не корректный URL`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: (props) => `${props.value} не корректный URL`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: (props) => `${props.value} не корректный URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
