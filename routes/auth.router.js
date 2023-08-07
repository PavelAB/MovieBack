const { registerValidator, loginValidator } = require('../Validators/auth.validator')
const bodyValidator = require('./../middlewares/bodyValidator')
const authController = require('../controllers/auth.controller')


const authRouter = require('express').Router()

authRouter.route('/register')
    .post(bodyValidator(registerValidator),authController.register)
authRouter.route('/login')
    //.post(bodyValidator(loginValidator),authController.login)
    .post(authController.login)


module.exports = authRouter