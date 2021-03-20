const router = require('express').Router();

const { getMovie, deleteMovie, createMovie } = require('../controllers/movies.js');
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validation');

router.get('/', getMovie);
router.post('/', validateAddMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
