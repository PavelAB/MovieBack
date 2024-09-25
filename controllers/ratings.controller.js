const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const ratingService = require('../services/ratings.service')
const { ErrorResponse } = require('../utils/ErrorResponse')


//TODO Verifier le statusCode
const ratingController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async ( req, res ) => {
        const { values, count } = await ratingService.getAll()
        
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
        
        const { values, count } = await ratingService.getByParams(req.params)
        
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
        else 
            res.status(400).json(new ErrorResponse('The element was not found.', 400))
    },

    /**
     * GetByParams - General function to handle searching with multiple or specific parameters automatically.
     * Also manages pagination and sends an appropriate response.
     * 
     * @param { Request } req - The request object, which contains query parameters including `limit`, `page`, and other search filters.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "NewSuccessResponse" containing:
     *   - `data` {Array<Object>} : List of paginated rates.
     *   - `totalCount` {number} : Total number of rates.
     *   - `currentPage` {number} : Current page number.
     *   - `totalPages` {number} : Total number of pages.
     * 
     * @returns {JSON} 404 - Not Found: If no elements are found, returns an error message.
     * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    getByParams: async ( req, res ) => {

        const { limit = 10, page = 1, ...data } = req.query
        
        try {
            const result = await ratingService.getByParams(data, Number(page), Number(limit))
            
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).json(new ErrorResponse(error.message, 500)) 
        }            
    },

    /**
     * Create - Function to create or update a rating.
     * 
     * @param { Request } req - The request object, which contains query parameters including data to create or update a raiting.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "SuccessResponseMsg" containing:
     *   - `msg` {string} : Message to notify the user whether the rating was created or updated.
     *   - `code` {number} : Status code.
     *      * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    create: async (req, res) => {

        const data = req.body

        const searchOne = {
            ID_Movie: data.Movie,
            ID_User: data.User,
        }
        
        try {
            const rateExist = await ratingService.getByParams(searchOne)
            const isExist = rateExist.data.length > 0

            if (isExist){
                await ratingService.update( rateExist.data[0].ID_Rating, data )
                return res.status(200).json(new SuccesResponseMsg('The rating has been updated.', 200))
            }
            else{
                await ratingService.create(data)
                return res.status(200).json(new SuccesResponseMsg('The rating has been created.', 200))
            }
            
        } catch (error) {
            return res.status(500).json(new ErrorResponse(error.message, 500))
        }
    },

    /**
     * update
     * @param { Request } req
     * @param { Response } res
     */
    update: async ( req, res ) => {

        const id = req.params.ID_Rating
        const body = req.body

        console.log(id);

        const updateRating = await ratingService.update( id, body )

        if(updateRating)
            res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))      
    },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {
        const id = req.params.ID_Rating
        const isDeleted = await ratingService.delete(id)
        
        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = ratingController