
const companyController = require('../controllers/companies.controller')
const authRoles = require('./../middlewares/authRoles')

const  companyRouter = require('express').Router()

companyRouter.route('/')
    .get(companyController.getAll)
    .post(authRoles('Admin'),companyController.create)
companyRouter.route('/params')
    .get(companyController.getByParams)
companyRouter.route('/:ID_Company')
    .get(companyController.getByID)
    .put(authRoles('Admin'),companyController.update)
    .delete(authRoles('Admin'),companyController.delete)

module.exports = companyRouter