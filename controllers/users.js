const User = require('../models/user');

const {
  SERVER_OK,
  SERVER_ERROR,
  ERROR_CODE,
  NOT_FOUND } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(SERVER_OK).send(user, { message: 'Запрос пользователя успешно выполнен' }));
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' }));
};

module.exports.getUserID = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с данными не найден' });
      } else {
        res.status(SERVER_OK).send(user, { message: 'Запрос пользователя успешно выполнен' });
      }
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SERVER_OK).send(user, { message: 'Запрос пользователя успешно выполнен' }))
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' });
        }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с данными не найден' });
      } else {
        res.status(SERVER_OK).send(user, { message: 'Запрос пользователя успешно выполнен' });
        }
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      } else { res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' }); }
    });
    next();
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с данными не найден' });
      } else {
        res.status(SERVER_OK).send(user, { message: 'Запрос пользователя успешно выполнен' });
        }
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' });
        }
    });
};