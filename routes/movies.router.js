const movieController = require('../controllers/movies.controller')

const  movieRouter = require('express').Router()

movieRouter.route('/')
    .get(movieController.getAll)
    .post(movieController.create)
movieRouter.route('/params')
    .get(movieController.getByParams)
movieRouter.route('/:ID_Movie')
    .get(movieController.getByID)
    .put(movieController.update)
    .delete(movieController.delete)

module.exports = movieRouter