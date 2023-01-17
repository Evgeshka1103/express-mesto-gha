require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const escape = require('escape-html');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const { errors } = require('celebrate');

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

routes.use(auth);

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
