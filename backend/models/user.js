const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    required: false,
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    required: false,
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error({ message: 'Некорректная ссылка' });
      }
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error({ message: 'Некорректный email' });
      }
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
