const genreController = require('../controllers/genres.controller')
const authRoles = require('../middlewares/authRoles')

const  genreRouter = require('express').Router()

genreRouter.route('/')
    .get(genreController.getAll)
    .post(authRoles('Admin'), genreController.create)
genreRouter.route('/params')
    .get(genreController.getByParams)
genreRouter.route('/:ID_Genre')
    .get(genreController.getByID)
    .put(authRoles('Admin'),genreController.update)
    .delete(authRoles('Admin'),genreController.delete)

module.exports = genreRouter