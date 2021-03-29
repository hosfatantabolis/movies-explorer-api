const usersRouter = require('express').Router();
const {
  updateUserInfoValidator,
} = require('../middlewares/validators');
const {
  updateUserInfo,
  getMe,
} = require('../controllers/users');

usersRouter.get('/me', getMe);
usersRouter.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = usersRouter;
