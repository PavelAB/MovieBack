const  commentRouter = require('express').Router()

commentRouter.route('/')
    .get()
    .post()
commentRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = commentRouter