const { Request, Response } = require('express')
const awardMovieService = require('../services/awards_movies.service')
const SuccessResponse = require('../utils/SuccessResponse')


//TODO ajouter l'erreur response 
const awardMovieController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { award_Movie, count } = await awardMovieService.getAll()

        res.status(200).json(new SuccessResponse( award_Movie, count ))
    },

     /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req,res ) => {
        const { values, count } = await awardMovieService.getByParams(req.params)
        res.status(200).json(new SuccessResponse( values, count ))

    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req,res ) => {

        const { values, count } = await awardMovieService.getByParams( req.query )
        res.status(200).json(new SuccessResponse( values, count ))

    },
    /**
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create: async ( req, res ) => {
        const data = req.body
        const isCreated = await awardMovieService.create(data)
        if(isCreated)
            res.sendStatus(200)
        else
            res.sendStatus(400)
    },

    /**
     * Update
     * @param { Request } req
     * @param { Response } res
     */
    update: async ( req, res ) => {
        //TODO Controller update
        res.sendStatus(501)
    },

    /**
     * Delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req,res ) => {
        const id = req.params.id
        const isDeleted = await awardMovieService.delete(id)
        //TODO Ajouter un if pour verifier si le nombre a supprime existe bien
        res.sendStatus(200)
    }
}
module.exports = awardMovieController