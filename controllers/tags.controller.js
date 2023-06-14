const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const tagService = require('../services/tags.service')
const { ErrorResponse } = require('../utils/ErrorResponse')




//TODO Verifier le statusCode
const tagController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { values, count } = await tagService.getAll()
        
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
        const { values, count } = await tagService.getByParams(req.params)
    
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req, res ) => {

        console.log(req.query);
        const { values, count } = await tagService.getByParams( req.query )
        
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))

        
    },

    /**
     * create
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        
        const data = req.body 
        const isCreated = await tagService.create(data)

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

    const id = req.params.ID_Tag
    const body = req.body

    console.log('req.body',req.body);

    const updateTag = await tagService.update( id, body )

    if(updateTag)
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

    const id = req.params.ID_Tag
    const body = req.body.movie

    const removeMovie = await tagService.removeMovieInTag( id, body )
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
        
        const id = req.params.ID_Tag
        const isDeleted = await tagService.delete(id)

        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = tagController