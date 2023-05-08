
const companyController = require('../controllers/companies.controller')

const  companyRouter = require('express').Router()

companyRouter.route('/')
    .get(companyController.getAll)
    .post(companyController.create)
companyRouter.route('/params')
    .get(companyController.getByParams)
companyRouter.route('/:ID_Company')
    .get(companyController.getByID)
    .put(companyController.update)
    .delete(companyController.delete)

module.exports = companyRouter