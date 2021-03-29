const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { Conflict } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  USER_ALREADY_EXISTS,
} = require('../utils/error_messages');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = `Bearer ${jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'hello-world-onotole', { expiresIn: '7d' })}`;
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(USER_ALREADY_EXISTS);
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .then((data) => {
          const {
            email: emailForResponse,
            name: nameForResponse,
          } = data;
          res.send({
            emailForResponse, nameForResponse,
          });
        })
        .catch((err) => {
          next(err);
        });
    }).catch((err) => {
      next(err);
    });
};

module.exports = { login, createUser };
