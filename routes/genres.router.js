const genreController = require('../controllers/genres.controller')
const authRoles = require('../middlewares/authRoles')
const bodyValidator = require('../middlewares/bodyValidator')
const {createGenresValidator, updateGenresValidator, removeMovieFromGenresValidator}= require('./../Validators/genres.validator')


const  genreRouter = require('express').Router()

genreRouter.route('/')
    .get(genreController.getAll)
    .post(authRoles('Admin'), bodyValidator(createGenresValidator), genreController.create)
genreRouter.route('/params')
    //.get(genreController.getByParams)
genreRouter.route('/:ID_Genre')
    .get(genreController.getByID)
    .put(authRoles('Admin'), bodyValidator(updateGenresValidator), genreController.update)
    .delete(authRoles('Admin'),genreController.delete)
genreRouter.route('/removeMovie/:ID_Genre')
    .put(authRoles('Admin'),bodyValidator(removeMovieFromGenresValidator), genreController.removeMovie)

module.exports = genreRouter