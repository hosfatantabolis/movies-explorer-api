const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { Unauthorized } = require('../utils/errors');
const { INVALID_INPUT } = require('../utils/error_messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(INVALID_INPUT));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(INVALID_INPUT));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
