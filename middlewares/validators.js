const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const signupValidator = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Некорректный E-mail');
    }).messages({
      'string.empty': 'E-mail - это обязательное поле',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': 'Пароль: Минимально 6 символов',
      'string.empty': 'Пароль - это обязательное поле',
    }),
    name: Joi.string().min(2).required().max(30)
      .messages({
        'string.min': 'Имя: Минимально 2 символа',
        'string.max': 'Имя: Максимум 30 символов',
        'string.empty': 'Имя - обязательное поле',
        'any.required': 'Имя - обязательное поле',
      }),
  },
});

const loginValidator = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Некорректный E-mail');
    }).messages({
      'string.empty': 'E-mail - это обязательное поле',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': 'Минимально 6 символов',
      'string.empty': 'Пароль - это обязательное поле',
    }),
  },
});

const updateUserInfoValidator = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Некорректный E-mail');
    }).messages({
      'string.empty': 'E-mail - это обязательное поле',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Имя: Минимально 2 символа',
        'string.max': 'Имя: Максимум 30 символов',
        'string.empty': 'Имя - обязательное поле',
        'any.required': 'Имя - обязательное поле',
      }),
  },
});

const postMovieValidator = celebrate({
  body: {
    country: Joi.string().required()
      .messages({
        'string.empty': 'Страна - обязательное поле',
        'any.required': 'Страна - обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': 'Режиссёр - обязательное поле',
        'any.required': 'Режиссёр - обязательное поле',
      }),
    duration: Joi.number().integer().positive().required()
      .messages({
        'any.empty': 'Длительность - обязательное поле',
        'any.required': 'Длительность - обязательное поле',
        'number.integer': 'Длительность фильма указывается в минутах (целое число, больше нуля)',
        'number.positive': 'Длительность фильма указывается в минутах (целое число, больше нуля)',
        'number.base': 'Длительность фильма указывается в минутах (целое число, больше нуля)',
      }),
    year: Joi.number().integer().positive().min(1888)
      .required()
      .messages({
        'any.empty': 'Год - обязательное поле',
        'any.required': 'Год - обязательное поле',
        'number.integer': 'Год фильма указан некорректно (целое число, больше нуля)',
        'number.positive': 'Год фильма указан некорректно (целое число, больше нуля)',
        'number.base': 'Год фильма указан некорректно (целое число, больше нуля)',
        'number.min': 'Первый показ фильма в истории был в 1888 году, Вы не можете переписать историю',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Описание - обязательное поле',
        'any.required': 'Описание - обязательное поле',
      }),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка на картинку (обложку)');
    }).messages({
      'string.empty': 'Ссылка на картинку - это обязательное поле',
      'any.required': 'Ссылка на картинку - это обязательное поле',
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка на трейлер');
    }).messages({
      'string.empty': 'Ссылка на трейлер - это обязательное поле',
      'any.required': 'Ссылка на трейлер - это обязательное поле',
    }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Название (на русском) - обязательное поле',
        'any.required': 'Название (на русском) - обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Название (на английском) - обязательное поле',
        'any.required': 'Название (на английском) - обязательное поле',
      }),
    movieId: Joi.number().integer().positive()
      .messages({
        'number.integer': 'Передан неверный ID фильма',
        'number.positive': 'Передан неверный ID фильма',
        'any.empty': 'ID фильма - обязательное поле',
        'any.required': 'ID фильма - обязательное поле',
      }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка на трейлер');
    }).messages({
      'string.empty': 'Ссылка на трейлер - это обязательное поле',
      'any.required': 'Ссылка на трейлер - это обязательное поле',
    }),
  },
});

const deleteMovieValidator = celebrate({
  params: {
    id: Joi.string().required().length(24).hex()
      .messages({
        'string.hex': 'Передан неверный ID фильма (24-битная HEX строка)',
        'string.length': 'Передан неверный ID фильма (24-битная HEX строка)',
        'any.empty': 'ID фильма - обязательное поле',
        'any.required': 'ID фильма - обязательное поле',
      }),
  },
});

module.exports = {
  signupValidator,
  loginValidator,
  updateUserInfoValidator,
  postMovieValidator,
  deleteMovieValidator,
};
