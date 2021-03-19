const CFG = {
  PORT: 3000,
  MONGO: 'mongodb://localhost:27017/bitfilmsdb',
};

const mongooseParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  CFG,
  mongooseParams,
};
