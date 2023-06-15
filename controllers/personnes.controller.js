const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const personneService = require('../services/personnes.service')
const { ErrorResponse } = require('../utils/ErrorResponse')





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
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))

    },

    /**
    * getByID
    * @param { Request } req
    * @param { Response } res
    */
   getByID: async ( req, res ) => {
       const { values, count } = await personneService.getByParams(req.params)

       if(values)
           if( values.length > 0 )
               res.status(200).json(new SuccessResponse( values, count ))
           else 
               res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
       else 
           res.status(400).json(new ErrorResponse('The elements were not found.', 400))
   },


    /**
     * getByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async ( req, res ) => {
        console.log(req.params);
        const { values, count } = await personneService.getByParams(req.query)

        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
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
        const isCreated = await personneService.create(data)
        
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
    
        const id = req.params.ID_Personne
        const body = req.body

        const updatePersonne = await personneService.update( id, body )

        if(updatePersonne)
            res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))      
    },

    removeMovieFromActors: async (req, res) => {

        const id = req.params.ID_Personne
        const body = req.body.movies

        const removeMoviesFromActors = await personneService.removeMovieFromActors(id, body)
        if (removeMoviesFromActors)
            if (removeMoviesFromActors === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    removeMovieFromWriters: async (req, res) => {

        const id = req.params.ID_Personne
        const body = req.body.movies

        const removeMoviesFromWriters = await personneService.removeMovieFromWriters(id, body)
        if (removeMoviesFromWriters)
            if (removeMoviesFromWriters === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },


    /**
     * update Avatar
     * @param { Request } req
     * @param { Response } res
     */
    updateAvatar: async (req, res) => {
        
        console.log(req.file.filename);
        const id = req.params.ID_Personne
        console.log("id :", id);
        const filename = req.file.filename

        const updated = await personneService.updateAvatar(id, filename)
        if (!updated) {
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
        
        const id = req.params.ID_Personne
        const isDeleted = await personneService.delete(id)

        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = personneController