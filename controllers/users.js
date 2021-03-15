const User = require('../models/user');
const { NotFound } = require('../utils/errors');

const {
  USER_NOT_FOUND,
} = require('../utils/error_messages');

const getMe = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  updateUserInfo,
  getMe,
};
