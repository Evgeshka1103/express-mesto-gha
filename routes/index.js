const express = require('express');

const { celebrate, Joi } = require('celebrate');

const validateURL = require('../middlewares/validation');

const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

const usersRoutes = require('./users');

const cardsRoutes = require('./cards');

const routes = express.Router();

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
}), createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.use('/users', auth, usersRoutes);

routes.use('/cards', auth, cardsRoutes);

routes.use(auth, () => {
  throw new NotFoundError({ message: 'Не найдено' });
});

module.exports = routes;
