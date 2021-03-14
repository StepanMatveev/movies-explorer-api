const Movie = require('../models/movie.js');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createMovie = (req, res, next) => {
  const { _id: userId } = req.user;
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new BadRequestError()));
};

module.exports.getMovie = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId).select('+owner')
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      movie.remove()
        .then((removedMovie) => res.send({ data: removedMovie }));
    })
    .catch(next);
};
