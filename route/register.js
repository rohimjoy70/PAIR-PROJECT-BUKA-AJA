const express = require('express')
const register = express.Router()
const RegisterController = require('../controller/RegisterController')

register.get("/", RegisterController.home)
register.post("/", RegisterController.loginPost)

register.get("/register", RegisterController.registerForm)
register.post("/register", RegisterController.saveRegister)



register.get("/register/:id/edit", RegisterController.editProfile)
register.post("/register/:id/edit", RegisterController.editSave)



module.exports = register