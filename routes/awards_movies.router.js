const awardMovieController = require('../controllers/awards_movies.controller')

const  awardMovieRouter = require('express').Router()

awardMovieRouter.route('/')
    .get(awardMovieController.getAll)
    .post(awardMovieController.create)
awardMovieRouter.route('/:ID_Award_Movie')
    .get(awardMovieController.getByID)
    .put()
    .delete(awardMovieController.delete)
//awardMovieRouter.route('/params/:type')
awardMovieRouter.route('/params')

//et si /type n'existe pas --> chemin non trouveOscar
    .get(awardMovieController.getByParams)


module.exports = awardMovieRouter