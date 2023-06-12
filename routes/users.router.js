const userController = require('../controllers/users.controller')
const authRoles = require('../middlewares/authRoles')


const  userRouter = require('express').Router()

userRouter.route('/')
    .get(userController.getAll)
    .post(userController.create)
userRouter.route('/params')
    .get(userController.getByParams)
userRouter.route('/:ID_User')
    .get(userController.getByID)
    .put(userController.update)
    .delete(authRoles('Admin'),userController.delete)

module.exports = userRouter