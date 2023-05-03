const tagController = require('../controllers/tags.controller')

const  tagsRouter = require('express').Router()

tagsRouter.route('/')
    .get(tagController.getAll)
    .post(tagController.create)
tagsRouter.route('/params')
    .get(tagController.getByParams)
tagsRouter.route('/:ID_Tag')
    .get(tagController.getByID)
    .put(tagController.update)
    .delete(tagController.delete)

module.exports = tagsRouter