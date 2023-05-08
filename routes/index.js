const authRouter = require('./auth.router')
const awardMovieRouter = require('./awards_movies.router')
const awardPersonneRouter = require('./awards_personnes.router')
const commentRouter = require('./comments.router')
const companyRouter = require('./companies.router')
const genreRouter = require('./genres.router')
const movieRouter = require('./movies.router')
const personneRouter = require('./personnes.router')
const ratingRouter = require('./ratings.router')
const tagsRouter = require('./tags.router')
const userRouter = require('./users.router')

const router = require('express').Router()


router.use('/awards_movies',awardMovieRouter)
router.use('/awards_personnes',awardPersonneRouter)
router.use('/comments',commentRouter)
router.use('/companies',companyRouter)
router.use('/genres',genreRouter)
router.use('/movies',movieRouter)
router.use('/personnes',personneRouter)
router.use('/ratings',ratingRouter)
router.use('/tags',tagsRouter)
router.use('/users',userRouter)
router.use('/auth',authRouter)

module.exports = router