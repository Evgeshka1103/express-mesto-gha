const OK = 200; // Запрос пользователя успешно выполнен

const BadRequest = 400; // Некорректный запрос

const NotFound = 404; // Не найдено

const InternalServerError = 500; // Внутренняя ошибка сервера

module.exports = {
  OK,
  BadRequest,
  NotFound,
  InternalServerError,
};
