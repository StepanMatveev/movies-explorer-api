require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index.js');
const limiter = require('./utils/limiter.js');
const centralErrorHandler = require('./middlewares/centralErrorHandler.js');
const { CFG, mongooseParams } = require('./utils/config.js');

const {
  PORT = CFG.PORT,
  MONGO = CFG.MONGO,
} = process.env;
const app = express();

mongoose.connect(MONGO, mongooseParams);
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(cors());
app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(limiter);
app.use(centralErrorHandler);

app.listen(PORT);
