const createCommentsValidator = require('../Validators/comments.validator')
const commentController = require('../controllers/comments.controller')
const authRoles = require('./../middlewares/authRoles')
const bodyValidator = require('./../middlewares/bodyValidator')


const  commentRouter = require('express').Router()

commentRouter.route('/')
    .get(authRoles('Admin'), commentController.getAll)
    //.post(authRoles('User'),bodyValidator(createCommentsValidator),commentController.create)
    .post(bodyValidator(createCommentsValidator),commentController.create)

commentRouter.route('/params')
    .get(authRoles('Admin'),commentController.getByParams)
commentRouter.route('/like')
    .post(commentController.createLike)
commentRouter.route('/:ID_Comment')
    .get(authRoles('Admin'),commentController.getByID)
    .put()
    .delete(authRoles('Admin'),commentController.delete)

module.exports = commentRouter