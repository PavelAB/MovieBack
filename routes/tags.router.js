const tagController = require('../controllers/tags.controller')
const authRoles = require('./../middlewares/authRoles')

const  tagsRouter = require('express').Router()

tagsRouter.route('/')
    .get(tagController.getAll)
    .post(authRoles('Admin'),tagController.create)
tagsRouter.route('/params')
    .get(tagController.getByParams)
tagsRouter.route('/:ID_Tag')
    .get(tagController.getByID)
    .put(authRoles('Admin'),tagController.update)
    .delete(authRoles('Admin'),tagController.delete)

module.exports = tagsRouter