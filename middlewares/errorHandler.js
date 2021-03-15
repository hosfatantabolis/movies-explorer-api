const { CelebrateError } = require('celebrate');
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Проблема валидации' });
    }
    return res.status(500).send({ message: 'Проблема с Mongo' });
  }
  if (err instanceof CelebrateError) {
    const errorBody = err.details.get('body');
    if (errorBody) {
      const { details: [errorDetails] } = errorBody;
      return res.status(400).send({ message: errorDetails.message });
    }
    const errorHeaders = err.details.get('headers');
    if (errorHeaders) {
      const { details: [errorDetails] } = errorHeaders;
      return res.status(400).send({ message: errorDetails.message });
    }
    const errorParams = err.details.get('params');
    if (errorParams) {
      const { details: [errorDetails] } = errorParams;
      return res.status(400).send({ message: errorDetails.message });
    }
  }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
  return next();
};

module.exports = errorHandler;
