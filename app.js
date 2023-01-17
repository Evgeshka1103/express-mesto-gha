require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const escape = require('escape-html');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const { errors } = require('celebrate');

const { InternalServerError } = require('./utils/constants');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const routes = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(auth);

app.use((err, req, res, next) => {
  const { statusCode = InternalServerError, message } = err;
  res.status(statusCode).send({
    message: statusCode === InternalServerError
      ? 'Внутренняя ошибка сервера'
      : message,
  });
  next();
});

app.use(errors());

routes.use(requestLogger);

routes.use(errorLogger);

app.use(helmet());

app.use(cookieParser());

app.use(limiter);

app.use(routes);

escape('<script>alert("hacked")</script>');

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
