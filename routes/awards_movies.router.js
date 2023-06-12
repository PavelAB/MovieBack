const { createAwards_MoviesValidator, updateAwards_MoviesValidator } = require('../Validators/awards_movie.validator')
const awardMovieController = require('../controllers/awards_movies.controller')
const bodyValidator = require('../middlewares/bodyValidator')
const authRoles = require('./../middlewares/authRoles')


const  awardMovieRouter = require('express').Router()

awardMovieRouter.route('/')
    .get(awardMovieController.getAll)
    .post(authRoles('Admin'),bodyValidator(createAwards_MoviesValidator),awardMovieController.create)
awardMovieRouter.route('/params')
    .get(awardMovieController.getByParams)
awardMovieRouter.route('/:ID_Award_Movie')
    .get(awardMovieController.getByID)
    .put(authRoles('Admin'),bodyValidator(updateAwards_MoviesValidator),awardMovieController.update)
    .delete(authRoles('Admin'),awardMovieController.delete)


module.exports = awardMovieRouter