const awardMovieController = require('../controllers/awards_movies.controller')

const  awardMovieRouter = require('express').Router()

awardMovieRouter.route('/')
    .get(awardMovieController.getAll)
    .post(awardMovieController.create)
awardMovieRouter.route('/params')
        .get(awardMovieController.getByParams)
awardMovieRouter.route('/:ID_Award_Movie')
    .get(awardMovieController.getByID)
    .put()
    .delete(awardMovieController.delete)


module.exports = awardMovieRouter