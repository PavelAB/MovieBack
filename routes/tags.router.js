const  tagsRouter = require('express').Router()

tagsRouter.route('/')
    .get()
    .post()
tagsRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = tagsRouter