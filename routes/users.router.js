const userController = require('../controllers/users.controller')
const authRoles = require('../middlewares/authRoles')
const authUser = require('../middlewares/authUser')
 

const multer = require('multer')
const bodyValidator = require('../middlewares/bodyValidator')
const { createUsersValidator, updateUsersValidator } = require('../Validators/users.validator')
const storage = require('../utils/config.multer')('avatar')
const upload = multer({storage})

const  userRouter = require('express').Router()

userRouter.route('/')
    .get(authRoles('Admin'), userController.getAll)
    .post(bodyValidator(createUsersValidator), userController.create)
//userRouter.route('/params')
    //.get(userController.getByParams)
userRouter.route('/:ID_User')
    .get(authUser(), userController.getByID)
    .put(authUser(), bodyValidator(updateUsersValidator), userController.update)
    .patch(authUser(), upload.single('avatar'), userController.updateAvatar)
    .delete(authRoles('Admin'), userController.delete)

module.exports = userRouter