const Card = require('../models/card');
const {
  OK,
  BadRequest,
  NotFound,
  InternalServerError,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(OK).send(card))
    .catch(() => res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else {
        res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'Не найдено' });
      } else {
        res.status(OK).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else {
        res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'Не найдено' });
      } else {
        res.status(OK).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.statu(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else {
        res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'Не найдено' });
      } else {
        res.status(OK).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Некорректный запрос', ...err });
      } else {
        res.status(InternalServerError).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
