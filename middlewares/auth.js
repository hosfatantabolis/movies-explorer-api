const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация 1' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'hello-world-onotole');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация 2' });
  }
  req.user = payload;
  return next();
};
