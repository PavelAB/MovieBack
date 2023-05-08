const awardMovieController = require('../controllers/awards_movies.controller')
const awardPersonneController = require('../controllers/awards_personnes.controller')

const  awardPersonneRouter = require('express').Router()

awardPersonneRouter.route('/')
    .get(awardPersonneController.getAll)
    .post(awardPersonneController.create)
awardPersonneRouter.route('/params')
    .get(awardPersonneController.getByParams)
awardPersonneRouter.route('/:ID_Award_Personne')
    .get(awardPersonneController.getByID)
    .put(awardPersonneController.update)
    .delete(awardPersonneController.delete)

    
module.exports = awardPersonneRouter