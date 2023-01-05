const express = require('express');

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers)
usersRoutes.get('/:userId', getUserById)
usersRoutes.post('/', express.json(), createUser)
usersRoutes.patch('/me', updateProfile)
usersRoutes.patch('/me/avatar', updateAvatar)

module.exports = usersRoutes;