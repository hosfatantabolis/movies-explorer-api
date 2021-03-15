const authRouter = require('express').Router();
const { signupValidator, loginValidator } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/auth');

authRouter.post('/signin', loginValidator, login);
authRouter.post('/signup', signupValidator, createUser);

module.exports = authRouter;
