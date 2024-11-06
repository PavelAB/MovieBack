const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const personneService = require('../services/personnes.service')
const { ErrorResponse } = require('../utils/ErrorResponse')
const commentService = require('../services/comments.service')





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
     * getRandomPersonnes - Function to handle searching for random personnes based on their job type.
     * 
     * @param { Request } req - The request object, which contains query parameters including `limit` (number of personnes to return) and `job` (job type filter).
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "NewSuccessResponse" containing:
     *   - `data` {Array<Person>} : List of random personnes.
     *   - `totalCount` {number} : Total number of personnes matching the criteria.
     *   - `totalPages` {number} : Total number of pages.
     *   - `currentPage` {number} : Current page number.
     * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    getRandomPersonnes: async ( req, res ) => {
        const {limit = 8, job = ""} = req.query

        try {
            const result = await personneService.getRandomPersonnes(Number(limit), job)
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).json(new ErrorResponse(error.message, 500)) 
        }
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
            return res.status(400).json(new ErrorResponse( "Something wrong, update picture failed.", 400 ))
        }
        res.status(204).json(new SuccesResponseMsg("Update picture succeeded.", 204))
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