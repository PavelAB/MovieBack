const  movieRouter = require('express').Router()

movieRouter.route('/')
    .get()
    .post()
movieRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = movieRouter