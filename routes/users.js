const usersRouter = require('express').Router();
const {
  updateUserInfoValidator,
  getMeValidator,
} = require('../middlewares/validators');
const {
  updateUserInfo,
  getMe,
} = require('../controllers/users');

usersRouter.get('/me', getMeValidator, getMe);
usersRouter.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = usersRouter;
