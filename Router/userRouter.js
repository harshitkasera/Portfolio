const userController = require('../Controller/UserController')
const express = require('express')

const Router = express.Router();

Router.post('/saveUser', userController.saveUser)
Router.post('/LoginUser', userController.LoginUser)

module.exports = Router