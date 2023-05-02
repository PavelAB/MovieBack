const  awardMovieRouter = require('express').Router()

awardMovieRouter.route('/')
    .get()
    .post()
awardMovieRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = awardMovieRouter