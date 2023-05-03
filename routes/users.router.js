const userController = require('../controllers/users.controller')

const  userRouter = require('express').Router()

userRouter.route('/')
    .get(userController.getAll)
    .post(userController.create)
userRouter.route('/params')
    .get(userController.getByParams)
userRouter.route('/:ID_User')
    .get(userController.getByID)
    .put(userController.update)
    .delete(userController.delete)

module.exports = userRouter