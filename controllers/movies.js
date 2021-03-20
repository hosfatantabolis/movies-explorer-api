const Movie = require('../models/movie');
const { NotFound, Forbidden } = require('../utils/errors');
const {
  NOT_ALLOWED,
  MOVIE_NOT_FOUND,
  MOVIES_NOT_FOUND,
} = require('../utils/error_messages');

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    }).catch((err) => {
      next(err);
    });
};
const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFound(MOVIES_NOT_FOUND);
      }
      res.send(movies);
    }).catch((err) => {
      next(err);
    });
};
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    if (!movie) {
      throw new NotFound(MOVIE_NOT_FOUND);
    }
    if (String(movie.owner) !== String(req.user._id)) {
      throw new Forbidden(NOT_ALLOWED);
    }
    movie.remove();
    res.send(movie);
  })
    .catch((err) => {
      next(err);
    });
};

module.exports = { postMovie, getSavedMovies, deleteMovieById };
