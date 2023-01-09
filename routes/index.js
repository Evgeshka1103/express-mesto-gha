const express = require('express');
const { NotFound } = require('../utils/constants');

const usersRoutes = require('./users');

const cardsRoutes = require('./cards');

const routes = express.Router();

routes.use('/users', usersRoutes);

routes.use('/cards', cardsRoutes);

routes.use('/', (req, res) => {
  res.status(NotFound).send(({ message: 'Не найдено' }));
});

module.exports = routes;
