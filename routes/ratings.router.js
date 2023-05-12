const ratingController = require('../controllers/ratings.controller')

const  ratingRouter = require('express').Router()

ratingRouter.route('/')
    .get(ratingController.getAll)
    .post(ratingController.create)
ratingRouter.route('/params')
    .get(ratingController.getByParams)
ratingRouter.route('/:ID_Rating')
    .get(ratingController.getByID)
    .put(ratingController.update)
    .delete(ratingController.delete)

module.exports = ratingRouter