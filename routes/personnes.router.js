const personneController = require('../controllers/personnes.controller')

const  personneRouter = require('express').Router()

personneRouter.route('/')
    .get(personneController.getAll)
    .post(personneController.create)
personneRouter.route('/params')
    .get(personneController.getByParams)
personneRouter.route('/:ID_Personne')
    .get(personneController.getByID)
    .put(personneController.update)
    .delete(personneController.delete)

module.exports = personneRouter