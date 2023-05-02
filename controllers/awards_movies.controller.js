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
        const { awards, count } = await awardMovieService.getAll()

        res.status(200).json(new SuccessResponse( awards, count ))
    }
}
module.exports = awardMovieController