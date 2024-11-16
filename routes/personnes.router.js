const personneController = require('../controllers/personnes.controller')
const authRoles = require('./../middlewares/authRoles')
const bodyValidator = require ('../middlewares/bodyValidator.js')
const { createPersonnesValidator, updatePersonnesValidator, removeActorsPersonnesValidator, removeWritersPersonnesValidator } = require('../Validators/personnes.validator')

const  personneRouter = require('express').Router()


const multer = require('multer')

const storage = require('../utils/config.multer')('personnesCovers')

const upload = multer({storage})


personneRouter.route('/')
    .get(personneController.getAll)
    .post(authRoles('Admin'), bodyValidator(createPersonnesValidator), personneController.create)
personneRouter.route('/params')
    .get(personneController.getByParams)
personneRouter.route('/random')
    .get(personneController.getRandomPersonnes)
personneRouter.route('/removeActors/:ID_Personne')
    .put(authRoles('Admin'), bodyValidator(removeActorsPersonnesValidator), personneController.removeMovieFromActors)
personneRouter.route('/removeWriters/:ID_Personne')
    .put(authRoles('Admin'), bodyValidator(removeWritersPersonnesValidator), personneController.removeMovieFromWriters)
personneRouter.route('/:ID_Personne')
    .get(personneController.getByID)
    .put(authRoles('Admin'), bodyValidator(updatePersonnesValidator), personneController.update)
    .patch(authRoles('Admin'),upload.single('personnesCovers'),personneController.updateAvatar)
    .delete(authRoles('Admin'),personneController.delete)

module.exports = personneRouter