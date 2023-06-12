const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const awardPersonneService = require('../services/awards_personnes.service')
const { ErrorResponse } = require('../utils/ErrorResponse')


//TODO Verifier le statusCode

const awardPersonneController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { award_Personne, count } = await awardPersonneService.getAll()
        
        if(award_Personne)
            res.status(200).json( new SuccessResponse( award_Personne, count ))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        const { values, count } = await awardPersonneService.getByParams(req.params)
        if(values)
            res.status(200).json( new SuccessResponse ( values, count ))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req, res ) => {

        const { values, count } = await awardPersonneService.getByParams( req.query )
        
        if(values)
            res.status(200).json( new SuccessResponse ( values, count ))
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
        
        const isCreated = await awardPersonneService.create(data)

        if(isCreated)
            res.status(200).json(new SuccessResponseMsg('The element has been created.', 200))
        else
            res.status(400).json(new ErrorResponse('Error during creation.', 400))
    },

    /**
     * update
     * @param { Request } req
     * @param { Response } res
     */
    update: async ( req, res ) => {
        res.sendStatus(501)
        //TODO faire l'update 
    },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {

        const id = req.params.ID_Award_Personne

        const isDeleted = await awardPersonneService.delete(id)
        
        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = awardPersonneController