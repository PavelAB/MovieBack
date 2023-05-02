const  awardPersonneRouter = require('express').Router()

awardPersonneRouter.route('/')
    .get()
    .post()
awardPersonneRouter.route('/:id')
    .get()
    .put()
    .delete()

module.exports = awardPersonneRouter