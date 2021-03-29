const invalidRouter = require('express').Router();
const { NotFound } = require('../utils/errors');
const { INVALID_URL } = require('../utils/error_messages');

invalidRouter.use('/', (req) => {
  if (req.originalUrl !== '/json') {
    throw new NotFound(INVALID_URL);
  }
});

module.exports = invalidRouter;
