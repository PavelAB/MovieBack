const { Request, Response } = require('express')
const SuccessResponse = require('../utils/SuccessResponse')
const tagService = require('../services/tags.service')


//TODO Gestion de l'Error response
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
            res.sendStatus(400)
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        
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
        const isCreated = await tagService.create(data)
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
        const id = req.params.ID_Tag
        const isDeleted = await tagService.delete(id)
        if (isDeleted) {
            res.status(200).json("Élément est supprimé.")            
        }
        else    
            res.status(400).json("Élément non trouvé")
    }
}
module.exports = tagController