const express = require('express');

const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63b95efec71e9fd3602f5d97',
  };

  next();
});

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
