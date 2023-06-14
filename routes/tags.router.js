const tagController = require('../controllers/tags.controller')
const bodyValidator = require('../middlewares/bodyValidator')
const authRoles = require('./../middlewares/authRoles')
const { createTagsValidator, updateTagsValidator, removeMovieFromTagsValidator } = require('./../Validators/tags.validator')


const  tagsRouter = require('express').Router()

tagsRouter.route('/')
    .get(tagController.getAll)
    .post(authRoles('Admin'), bodyValidator(createTagsValidator), tagController.create)
tagsRouter.route('/params')
    .get(tagController.getByParams)
tagsRouter.route('/:ID_Tag')
    .get(tagController.getByID)
    .put(authRoles('Admin'), bodyValidator(updateTagsValidator), tagController.update)
    .delete(authRoles('Admin'),tagController.delete)
tagsRouter.route('/removeMovie/:ID_Tag')
    .put(authRoles('Admin'), bodyValidator(removeMovieFromTagsValidator), tagController.removeMovie)

module.exports = tagsRouter