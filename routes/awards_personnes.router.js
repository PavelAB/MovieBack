const createAwards_PersonnesValidator = require('../Validators/awards_personnes.validator')
const awardPersonneController = require('../controllers/awards_personnes.controller')
const bodyValidator = require('../middlewares/bodyValidator')
const authRoles = require('./../middlewares/authRoles')



const  awardPersonneRouter = require('express').Router()

awardPersonneRouter.route('/')
    .get(awardPersonneController.getAll)
    .post(authRoles('Admin'),bodyValidator(createAwards_PersonnesValidator),awardPersonneController.create)
awardPersonneRouter.route('/params')
    .get(awardPersonneController.getByParams)
awardPersonneRouter.route('/:ID_Award_Personne')
    .get(awardPersonneController.getByID)
    .put(authRoles('Admin'),awardPersonneController.update)
    .delete(authRoles('Admin'),awardPersonneController.delete)

    
module.exports = awardPersonneRouter