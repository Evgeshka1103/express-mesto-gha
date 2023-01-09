const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    name: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    about: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    avatar:
      'https://www.rgo.ru/sites/default/files/styles/head_image_article/public/1034295-e1477344635669-1.jpg?itok=4U4Dw9en',
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
