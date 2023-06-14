const ratingController = require('../controllers/ratings.controller')
const authRoles = require('./../middlewares/authRoles')
const bodyValidator = require ('./../middlewares/bodyValidator.js')
const { createRatingsValidator, updateRatingsValidator } = require('./../Validators/ratings.validator')


const  ratingRouter = require('express').Router()

ratingRouter.route('/')
    .get(authRoles('User'),ratingController.getAll)
    .post(authRoles('Admin'), bodyValidator(createRatingsValidator), ratingController.create)
ratingRouter.route('/params')
    .get(authRoles('User'),ratingController.getByParams)
ratingRouter.route('/:ID_Rating')
    .get(authRoles('User'),ratingController.getByID)
    .put(authRoles('Admin'), bodyValidator(updateRatingsValidator), ratingController.update)
    .delete(authRoles('Admin'),ratingController.delete)

module.exports = ratingRouter