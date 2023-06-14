const movieController = require('../controllers/movies.controller')
const authRoles = require('./../middlewares/authRoles')

const  movieRouter = require('express').Router()

const multer = require('multer')
const storage = require('../utils/config.multer')('covers')
const upload = multer({storage})


movieRouter.route('/')
    .get(movieController.getAll)
    .post(authRoles('Admin'),movieController.create)
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
movieRouter.route('/:ID_Movie')
    .get(movieController.getByID)
    .put(authRoles('Admin'),movieController.update)
    .patch(authRoles('Admin'),upload.single('covers'),movieController.updateAvatar)
    .delete(authRoles('Admin'),movieController.delete)

module.exports = movieRouter