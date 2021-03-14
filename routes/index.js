const router = require('express').Router();
const movieRouter = require('./movie.js');
const userRouter = require('./user.js');
const auth = require('../middlewares/auth.js');
const { createUser, login } = require('../controllers/users.js');
const { validateLogin, validateRegister } = require('../middlewares/validation.js');
const NotFoundError = require('../errors/NotFoundError.js');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
