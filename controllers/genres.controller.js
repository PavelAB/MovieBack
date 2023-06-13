const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const genreService = require('../services/genres.service')
const { ErrorResponse } = require('../utils/ErrorResponse')


//TODO Verifier le statusCode

const genreController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { values, count } = await genreService.getAll()
        
        if(values)
            res.status(200).json( new SuccessResponse( values, count ))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        const { values, count } = await genreService.getByParams(req.params)
    
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    // /**
    //  * GetByParams
    //  * @param { Request } req
    //  * @param { Response } res
    //  */
    // getByParams: async ( req, res ) => {
    //     res.sendStatus(501)
        
    // },

    /**
     * create
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        const data = req.body 
        const isCreated = await genreService.create(data)
        
        if(isCreated)
            res.status(200).json(new SuccesResponseMsg('The element has been created.', 200))
        else
            res.status(400).json(new ErrorResponse('Error during creation.', 400))
    },

    /**
     * update
     * @param { Request } req
     * @param { Response } res
     */
    update: async ( req, res ) => {

        const id = req.params.ID_Genre
        const body = req.body

        const updateGenre = await genreService.update( id, body )

        if(updateGenre)
            res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))      

    },

    /**
     * removeMovie
     * @param { Request } req
     * @param { Response } res
     */
    removeMovie: async ( req, res ) => {

        const id = req.params.ID_Genre
        const body = req.body.movie

        const removeMovie = await genreService.removeMovieInGenre( id, body )
        if(removeMovie)
            if(removeMovie === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {
 
        const id = req.params.ID_Genre

        const isDeleted = await genreService.delete(id)
        
        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = genreController