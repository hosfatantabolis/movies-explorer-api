const { CelebrateError } = require('celebrate');
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    return res.status(500).send({ message: 'Проблема с Mongo' });
  }
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: err.message });
  }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
  return next();
};

module.exports = errorHandler;
