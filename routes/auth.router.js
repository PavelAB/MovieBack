const authRouter = require('express').Router()

authRouter.route('/register')
    .post()
authRouter.route('login')
    .post()

module.exports = authRouter