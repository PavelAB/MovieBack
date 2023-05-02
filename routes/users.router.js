const  userRouter = require('express').Router()

userRouter.route('/')
    .get()
    .post()
userRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = userRouter