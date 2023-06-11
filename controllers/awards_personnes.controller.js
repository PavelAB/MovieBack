const { Request, Response } = require('express')
const SuccessResponse = require('../utils/SuccessResponse')
const awardPersonneService = require('../services/awards_personnes.service')

//TODO Gestion de l'Error response
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
            res.sendStatus(400)
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
            res.sendStatus(400)
    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req, res ) => {
        console.log("Querry",req.query);
        const { values, count } = await awardPersonneService.getByParams( req.query )
        if(values)
            res.status(200).json( new SuccessResponse ( values, count ))
        else 
            res.sendStatus(400)
        
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
        const id = req.params.ID_Award_Personne
        console.log(id);
        const isDeleted = await awardPersonneService.delete(id)
        //TODO Ajouter un if pour verifier si le nombre a supprime existe bien
        res.sendStatus(200)
    }
}
module.exports = awardPersonneController