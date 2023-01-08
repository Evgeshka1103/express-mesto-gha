const express = require('express');

const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');



app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listen port ${PORT}`);
});
