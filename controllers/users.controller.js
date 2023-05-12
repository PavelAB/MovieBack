const { Request, Response } = require('express')
const SuccessResponse = require('../utils/SuccessResponse')
const userService = require('../services/users.service')

//TODO Gestion de l'Error response
//TODO Verifier le statusCode
const userController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { users, count } = await userService.getAll()

        if(users)
            res.status(200).json(new SuccessResponse( users,count ))
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
        const isCreate = await userService.create(data)
        if(isCreate)
            res.sendStatus(200)
        else
            res.sendStatus(400)
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
        const id = req.params.ID_User
        const isDeleted = await userService.delete(id)
        if (isDeleted) {
            res.status(200).json("Élément est supprimé.")            
        }
        else    
            res.status(400).json("Élément non trouvé")
    }
}
module.exports = userController