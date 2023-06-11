const awardMovieController = require('../controllers/awards_movies.controller')
const authRoles = require('./../middlewares/authRoles')

const  awardMovieRouter = require('express').Router()

awardMovieRouter.route('/')
    .get(awardMovieController.getAll)
    .post(authRoles('Admin'),awardMovieController.create)
awardMovieRouter.route('/params')
    .get(awardMovieController.getByParams)
awardMovieRouter.route('/:ID_Award_Movie')
    .get(awardMovieController.getByID)
    .put()
    .delete(authRoles('Admin'),awardMovieController.delete)


module.exports = awardMovieRouter