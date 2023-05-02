const { Request, Response } = require('express')
const awardMovieService = require('../services/awards_movies.service')
const SuccessResponse = require('../utils/SuccessResponse')

const awardMovieController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { award_Movie, count } = await awardMovieService.getAll()

        res.status(200).json(new SuccessResponse( award_Movie, count ))
    },
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        const data = req.body
        const isCreated = await awardMovieService.create(data)
        if(isCreated)
            res.sendStatus(200)
        else
            res.sendStatus(400)
    }
}
module.exports = awardMovieController