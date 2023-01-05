const User = require('../models/user');

const {
  OK,
  BadRequest,
  NotFound,
  InternalServerError } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.status(OK).send(users))
  .catch(() => res.status(InternalServerError).send({message: 'Внутренняя ошибка сервера'}))
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)

  .then((user) => {
    if (!user) {
      res.status(NotFound).send({ message: 'Не найдено' });
    } else {
      res.status(OK).send(user);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
    } else if(err.message === 'not found') {
      res.status(NotFound).send({message: 'Не найдено'});
    } else {
      res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' });
    }
  });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else { res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' }); }
    });
}

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NotFound).send({ message: 'Не найдено' });
      } else { res.status(OK).send(user); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else { res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' }); }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NotFound).send({ message: 'Не найдено' });
      } else { res.status(OK).send(user); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else { res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' }); }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};