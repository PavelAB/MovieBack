const { Request, Response } = require('express')
const SuccessResponse = require('../utils/SuccessResponse')
const personneService = require('../services/personnes.service')



//TODO Gestion de l'Error response
//TODO Verifier le statusCode
const personneController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { values, count } = await personneService.getAll()
        
        if(values)
            res.status(200).json( new SuccessResponse( values, count ))
        else
            res.sendStatus(400)
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        res.sendStatus(501)
    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req, res ) => {
        res.sendStatus(501)
        
    },

    /**
     * create
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        const data = req.body 
        const isCreated = await personneService.create(data)
        if(isCreated)
            res.sendStatus(200)
        else
            res.sendStatus(401)
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
        res.sendStatus(501)
    }
}
module.exports = personneController