// Ошибки валидации
const VALIDATION_ERROR = 'Введены некорректные данные';

// Ошибки пользователя
const UNAUTHORIZED = 'Необходима авторизация';
const USER_ALREADY_EXISTS = 'Пользователь с таким e-mail уже зарегистрирован';
const USER_NOT_FOUND = 'Пользователь не найден';
const NO_USERS = 'Нет зарегистрированных пользователей';
const INVALID_ID = 'Некорректный идентификатор пользователя';
const INVALID_INPUT = 'Неправильные почта или пароль';

// Ошибки фильмов
const MOVIES_NOT_FOUND = 'Фильмы не найдены';
const MOVIE_NOT_FOUND = 'Фильм с таким ID не найден';
const NOT_ALLOWED = 'Недостаточно прав для удаления фильма';

// Серверные ошибки
const SERVER_ERROR = 'Ошибка на сервере. Код: 500';
const INVALID_URL = 'Запрашиваемый ресурс не найден';

// Ошибки БД
const DB_CONN_ERROR = 'Ошибка подключения к БД';

module.exports = {
  VALIDATION_ERROR,
  UNAUTHORIZED,
  USER_NOT_FOUND,
  NO_USERS,
  SERVER_ERROR,
  MOVIE_NOT_FOUND,
  INVALID_URL,
  INVALID_ID,
  INVALID_INPUT,
  USER_ALREADY_EXISTS,
  MOVIES_NOT_FOUND,
  NOT_ALLOWED,
  DB_CONN_ERROR,
};
