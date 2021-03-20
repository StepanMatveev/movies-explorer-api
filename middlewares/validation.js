const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL, isEmail } = require('validator');

const validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
    password: Joi.string().min(5).required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
    password: Joi.string().min(5).required(),
  }),
});

module.exports = {
  validateAddMovie,
  validateDeleteMovie,
  validateLogin,
  validateRegister,
  validateUpdateProfile,
};
