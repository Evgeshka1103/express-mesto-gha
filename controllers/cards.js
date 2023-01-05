const Card = require('../models/card');

const {
  SERVER_OK,
  SERVER_ERROR,
  ERROR_CODE,
  NOT_FOUND } = require('../utils/constants');

  module.exports.getCards = (req, res) => {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((card) => res.status(SERVER_OK).send(card, { message: 'Запрос пользователя успешно выполнен' }))
      .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' }));
  };

  module.exports.createCard = (req, res) => {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.status(SERVER_OK).send(card, { message: 'Запрос пользователя успешно выполнен' }))
      .catch((err) => {
        if (err.name === 'Error') {
          res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        } else { res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' }); }
      });
  };

  module.exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(NOT_FOUND).send({ message: 'Данные карточки не найдены' });
        } else {
          res.status(SERVER_OK).send(card, { message: 'Запрос пользователя успешно выполнен' });
        }
      })
      .catch((err) => {
        if (err.name === 'Error') {
          res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        } else {
          res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' });
        }
      });
  };

  module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(NOT_FOUND).send({ message: 'Данные карточки не найдены' });
        } else { res.status(SERVER_OK).send(card, { message: 'Запрос пользователя успешно выполнен' }); }
      })
      .catch((err) => {
        if (err.name === 'Error') {
          res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        } else if (err.name === 'Error') {
          res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        } else { res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' }); }
      });
  };

  module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(NOT_FOUND).send({ message: 'Данные карточки не найдены' });
        } else { res.status(SERVER_OK).send(card, { message: 'Запрос пользователя успешно выполнен' }); }
      })
      .catch((err) => {
        if (err.name === 'Error') {
          res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        } else if (err.name === 'CastError') {
          res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        } else { res.status(SERVER_ERROR).send({ message: 'Ошибка на стороне сервера' }); }
      });
  };