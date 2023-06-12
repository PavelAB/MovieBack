const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const movieService = require('../services/movies.service')
const { ErrorResponse } = require('../utils/ErrorResponse')



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
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))

    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {

        const id = req.params.ID_Movie
        console.log(id);
        const movie = await movieService.getById(id)
        
        if(movie)
            res.status(200).json(movie)
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