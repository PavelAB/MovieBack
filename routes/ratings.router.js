const  ratingRouter = require('express').Router()

ratingRouter.route('/')
    .get()
    .post()
ratingRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = ratingRouter