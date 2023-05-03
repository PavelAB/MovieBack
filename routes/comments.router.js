const commentController = require('../controllers/comments.comtroller')

const  commentRouter = require('express').Router()

commentRouter.route('/')
    .get(commentController.getAll)
    .post(commentController.create)
commentRouter.route('/params')
    .get(commentController.getByParams)
commentRouter.route('/:ID_Comment')
    .get(commentController.getByID)
    .put()
    .delete(commentController.delete)

module.exports = commentRouter