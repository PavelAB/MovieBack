const genreController = require('../controllers/genres.controller')

const  genreRouter = require('express').Router()

genreRouter.route('/')
    .get(genreController.getAll)
    .post(genreController.create)
genreRouter.route('/params')
    .get(genreController.getByParams)
genreRouter.route('/:ID_Genre')
    .get(genreController.getByID)
    .put(genreController.update)
    .delete(genreController.delete)

module.exports = genreRouter