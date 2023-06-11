const movieController = require('../controllers/movies.controller')

const  movieRouter = require('express').Router()

const multer = require('multer')
const storage = require('../utils/config.multer')('covers')
const upload = multer({storage})


movieRouter.route('/')
    .get(movieController.getAll)
    .post(movieController.create)
movieRouter.route('/params')
    .get(movieController.getByParams)
movieRouter.route('/:ID_Movie')
    .get(movieController.getByID)
    .put(movieController.update)
    .patch(upload.single('covers'),movieController.updateAvatar)
    .delete(movieController.delete)

module.exports = movieRouter