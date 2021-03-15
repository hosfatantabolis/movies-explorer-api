const moviesRouter = require('express').Router();
const {
  getSavedMoviesValidator,
  postMovieValidator,
  deleteMovieValidator,
} = require('../middlewares/validators');
const {
  postMovie,
  getSavedMovies,
  deleteMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', getSavedMoviesValidator, getSavedMovies);
moviesRouter.post('/', postMovieValidator, postMovie);
moviesRouter.delete('/:id', deleteMovieValidator, deleteMovieById);

module.exports = moviesRouter;
