const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const commentService = require('../services/comments.service')
const { ErrorResponse } = require('../utils/ErrorResponse')



//TODO Gestion de l'Error response
//TODO Verifier le statusCode
const commentController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { comment, count } = await commentService.getAll()
        
        if(comment)
            res.status(200).json( new SuccessResponse( comment, count ))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        const { values, count } = await commentService.getByParams(req.params)
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
        res.sendStatus(501)
        //TODO ajouter le recherche par l'id_user ou ID_Movie
    },

    /**
     * create
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        
        const data = req.body 
        const isCreated = await commentService.create(data)

        if(isCreated)
            res.status(200).json(new SuccesResponseMsg('The element has been created.', 200))
        else
            res.status(400).json(new ErrorResponse('Error during creation.', 400))
    },

    // /**
    //  * update
    //  * @param { Request } req
    //  * @param { Response } res
    //  */
    // update: async ( req, res ) => {
    //     res.sendStatus(501)
    //     //TODO faire l'update 
    // },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {

        const id = req.params.ID_Comment
        const isDeleted = await commentService.delete(id)
        
        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = commentController