const  companyRouter = require('express').Router()

companyRouter.route('/')
    .get()
    .post()
companyRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = companyRouter