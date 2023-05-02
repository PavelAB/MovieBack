const awardMovieController = require('../controllers/awards_movies.controller')

const  awardMovieRouter = require('express').Router()

awardMovieRouter.route('/')
    .get(awardMovieController.getAll)
    .post()
awardMovieRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = awardMovieRouter