const  personneRouter = require('express').Router()

personneRouter.route('/')
    .get()
    .post()
personneRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = personneRouter