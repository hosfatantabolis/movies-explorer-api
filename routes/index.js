const router = require('express').Router();
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const authRouter = require('./auth.js');
const invalidRouter = require('./invalidURL.js');
const auth = require('../middlewares/auth.js');

router.use('/', authRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', auth, invalidRouter);

module.exports = router;
