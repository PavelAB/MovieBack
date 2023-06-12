const commentController = require('../controllers/comments.controller')
const authRoles = require('./../middlewares/authRoles')


const  commentRouter = require('express').Router()

commentRouter.route('/')
    .get(authRoles('User'), commentController.getAll)
    .post(authRoles('User'),commentController.create)
commentRouter.route('/params')
    .get(authRoles('User'),commentController.getByParams)
commentRouter.route('/:ID_Comment')
    .get(authRoles('User'),commentController.getByID)
    .put()
    .delete(commentController.delete)

module.exports = commentRouter