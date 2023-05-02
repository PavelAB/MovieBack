const  genreRouter = require('express').Router()

genreRouter.route('/')
    .get()
    .post()
genreRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = genreRouter