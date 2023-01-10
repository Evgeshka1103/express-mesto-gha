const OK = 200; // Запрос пользователя успешно выполнен

const CreatedCode = 201; // Успешно, ресурс создан

const BadRequest = 400; // Некорректный запрос

const NotFound = 404; // Не найдено

const InternalServerError = 500; // Внутренняя ошибка сервера

module.exports = {
  OK,
  CreatedCode,
  BadRequest,
  NotFound,
  InternalServerError,
};
