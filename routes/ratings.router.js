const ratingController = require('../controllers/ratings.controller')
const authRoles = require('./../middlewares/authRoles')

const  ratingRouter = require('express').Router()

ratingRouter.route('/')
    .get(authRoles('User'),ratingController.getAll)
    .post(authRoles('Admin'),ratingController.create)
ratingRouter.route('/params')
    .get(authRoles('User'),ratingController.getByParams)
ratingRouter.route('/:ID_Rating')
    .get(authRoles('User'),ratingController.getByID)
    .put(authRoles('Admin'),ratingController.update)
    .delete(authRoles('Admin'),ratingController.delete)

module.exports = ratingRouter