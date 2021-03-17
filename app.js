require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index.js');
const limiter = require('./utils/limiter.js');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
