const { Request, Response } = require('express')
const SuccessResponse = require('../utils/SuccessResponse')
const commentService = require('../services/comments.service')



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
            res.sendStatus(400)
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        const { values, count } = await commentService.getByParams(req.params)
        if(values)
            res.status(200).json( new SuccessResponse ( values, count ))
        else 
            res.sendStatus(400)
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
        const id = req.params.ID_Comment
        const isDeleted = await commentService.delete(id)
        //TODO Ajouter un if pour verifier si le nombre a supprime existe bien
        res.sendStatus(200)
    }
}
module.exports = commentController