const personneController = require('../controllers/personnes.controller')
const authRoles = require('./../middlewares/authRoles')

const  personneRouter = require('express').Router()

personneRouter.route('/')
    .get(personneController.getAll)
    .post(authRoles('Admin'),personneController.create)
personneRouter.route('/params')
    .get(personneController.getByParams)
personneRouter.route('/:ID_Personne')
    .get(personneController.getByID)
    .put(authRoles('Admin'),personneController.update)
    .delete(authRoles('Admin'),personneController.delete)

module.exports = personneRouter