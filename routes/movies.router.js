const { createMoviesValidator, updateMoviesValidator, removeActorsValidator, removeCompaniesValidator, removeGenresValidator, removeTagsValidator, removeWritersValidator } = require('../Validators/movies.validator')
const movieController = require('../controllers/movies.controller')
const authRoles = require('./../middlewares/authRoles')
const bodyValidator = require('./../middlewares/bodyValidator')




const  movieRouter = require('express').Router()

const multer = require('multer')
const storage = require('../utils/config.multer')('covers')
const upload = multer({storage})


movieRouter.route('/')
    .get(movieController.getAll)
    .post(authRoles('Admin'), bodyValidator(createMoviesValidator), movieController.create)
movieRouter.route('/searchByTitle')
    .get(movieController.getByTitle)
movieRouter.route('/params')
    .get(movieController.getByParams)
movieRouter.route('/tags')
    .get(movieController.getByTags)
movieRouter.route('/companies')
    .get(movieController.getByCompanies)
movieRouter.route('/awards')
    .get(movieController.getByAwards)
movieRouter.route('/genres')
    .get(movieController.getByGenres)
movieRouter.route('/personnes')
    .get(movieController.getByPersonnes)
movieRouter.route('/removeTags/:ID_Movie')
    .put(authRoles('Admin'), bodyValidator(removeTagsValidator), movieController.removeTags)
movieRouter.route('/removeCompanies/:ID_Movie')
    .put(authRoles('Admin'), bodyValidator(removeCompaniesValidator), movieController.removeCompanies)
movieRouter.route('/removeGenres/:ID_Movie')
    .put(authRoles('Admin'), bodyValidator(removeGenresValidator), movieController.removeGenres)
movieRouter.route('/removeActors/:ID_Movie')
    .put(authRoles('Admin'), bodyValidator(removeActorsValidator), movieController.removeActors)
movieRouter.route('/removeWriters/:ID_Movie')
    .put(authRoles('Admin'), bodyValidator(removeWritersValidator), movieController.removeWriters)
movieRouter.route('/:ID_Movie')
    .get(movieController.getByID)
    .put(authRoles('Admin'), bodyValidator(updateMoviesValidator), movieController.update)
    .patch(authRoles('Admin'),upload.single('covers'),movieController.updateAvatar)
    .delete(authRoles('Admin'),movieController.delete)

module.exports = movieRouter