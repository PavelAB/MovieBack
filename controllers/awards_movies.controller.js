const { Request, Response } = require('express')
const awardMovieService = require('../services/awards_movies.service')
const { SuccessResponse, SuccesResponseMsg } = require('../utils/SuccessResponse')
const {ErrorResponse} = require('./../utils/ErrorResponse')


//TODO Verifier le statusCode

const awardMovieController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        
        const { award_Movie, count } = await awardMovieService.getAll()
        
        if(award_Movie)
            res.status(200).json(new SuccessResponse( award_Movie, count ))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

     /**
     * GetById
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        
        const { values, count } = await awardMovieService.getByParams(req.params)
        
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
        else 
            res.status(400).json(new ErrorResponse('The element was not found.', 400))
    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req, res ) => {
        
        const { values, count } = await awardMovieService.getByParams( req.query )
        
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },
    /**
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        
        const data = req.body
        
        const isCreated = await awardMovieService.create(data)
        
        if(isCreated)
            res.status(200).json(new SuccesResponseMsg('The element has been created.', 200))
        else
            res.status(400).json(new ErrorResponse('Error during creation.', 400))
    },

    /**
     * Update
     * @param { Request } req
     * @param { Response } res
     */
    update: async ( req, res ) => {

        const id = req.params.ID_Award_Movie
        const body = req.body

        const updateMovieAward = await awardMovieService.update( id, body )

        if(updateMovieAward)
            res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))      


    },

    /**
     * Delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {

        const id = req.params.ID_Award_Movie

        const isDeleted = await awardMovieService.delete(id)
        
        if(isDeleted)
            res.status(200).json("The element has been deleted.")
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = awardMovieController