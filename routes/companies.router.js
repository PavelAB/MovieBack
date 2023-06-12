const bodyValidator = require('./../middlewares/bodyValidator')
const companyController = require('../controllers/companies.controller')
const authRoles = require('./../middlewares/authRoles')
const { createCompaniesValidator, updateCompaniesValidator, removeMovieFromCompaniesValidator} = require('../Validators/companies.validator')



const  companyRouter = require('express').Router()

companyRouter.route('/')
    .get(companyController.getAll)
    .post(authRoles('Admin'),bodyValidator(createCompaniesValidator),companyController.create)
companyRouter.route('/params')
    //.get(companyController.getByParams)
companyRouter.route('/:ID_Company')
    .get(companyController.getByID)
    .put(authRoles('Admin'), bodyValidator(updateCompaniesValidator), companyController.update)
    .delete(authRoles('Admin'),companyController.delete)
companyRouter.route('/removeMovie/:ID_Company')
    .put(authRoles('Admin'), bodyValidator(removeMovieFromCompaniesValidator), companyController.removeMovie)

module.exports = companyRouter