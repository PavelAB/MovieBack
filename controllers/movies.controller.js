const { Request, Response } = require('express')
const SuccessResponse = require('../utils/SuccessResponse')
const movieService = require('../services/movies.service')


//TODO Gestion de l'Error response
//TODO Verifier le statusCode
const movieController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { values, count } = await movieService.getAll()
        console.log("coucou");
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
        const isCreated = await movieService.create(data)
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
     * update Avatar
     * @param { Request } req
     * @param { Response } res
     */
    updateAvatar : async ( req, res ) => {
        console.log(req.file.filename);
        const id = req.params.ID_Movie
        console.log("id :",id);
        const filename = req.file.filename

        const updated = await movieService.updateAvatar(id, filename)
        if(!updated){
            return res.sendStatus(400)
        }
        res.sendStatus(204)
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
module.exports = movieController