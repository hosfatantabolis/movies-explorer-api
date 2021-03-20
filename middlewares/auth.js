const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../utils/errors');
const { UNAUTHORIZED } = require('../utils/error_messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'hello-world-onotole');
  } catch (err) {
    throw new Unauthorized(UNAUTHORIZED);
  }
  req.user = payload;
  return next();
};
