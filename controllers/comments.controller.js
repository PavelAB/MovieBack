const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const commentService = require('../services/comments.service')
const { ErrorResponse } = require('../utils/ErrorResponse')




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
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        const { values, count } = await commentService.getByParams(req.params)
        if(values)
            if( values.length > 0 )
                res.status(200).json(new SuccessResponse( values, count ))
            else 
                res.status(200).json(new SuccesResponseMsg('The element was not found.', 200))
        else 
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * getByParams - General function to handle searching with multiple or specific parameters automatically.
     * Also manages pagination and sends an appropriate response.
     * 
     * @param { Request } req - The request object, which contains query parameters including `limit`, `page`, and other search filters.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "NewSuccessResponse" containing:
     *   - `data` {Array<Object>} : List of paginated comments.
     *   - `totalCount` {number} : Total number of comments.
     *   - `currentPage` {number} : Current page number.
     *   - `totalPages` {number} : Total number of pages.
     * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    getByParams: async ( req, res ) => {

        const { limit = 10, page = 1, ...data } = req.query

        
        try {
            const result = await commentService.getByParams(data, Number(page), Number(limit))
            
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).json(new ErrorResponse(error.message, 500)) 
        }  
    },

    /**
     * create - Function to create a new comment.
     * 
     * @param { Request } req - The request object, containing the data to create a comment in the body.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "SuccessResponseMsg" containing:
     *   - `msg` {string} : Message to notify the user whether the comment was created.
     *   - `code` {number} : Status code.
     *      * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    create: async ( req, res ) => {
        
        const data = req.body         

        try {
            await commentService.create(data)
            res.status(200).json(new SuccesResponseMsg('The element has been created.', 200))
        } catch (error) {
            res.status(500).json(new ErrorResponse('Error during creation.', 500))
        }            
    },

    /**
     * createLike - Function to create or update a `MM_Users_Comments` entry, for add or remove a like on a comment.
     * 
     * @param { Request } req - The request object containing query parameters and data to create or update a like for a comment.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "SuccessResponseMsg" containing:
     *   - `msg` {string} : Message to notify the user whether the like was created or updated.
     *   - `code` {number} : Status code.
     *      * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    createLike: async (req, res) => {

        const data = req.body

        const searchOne = {
            ID_Comment : data.Comment,
            ID_User : data.User
        }

        try{

            const likeExist = await commentService.getCommentUserMMByID(searchOne)

            if(likeExist){
                await commentService.updateLike(likeExist.dataValues.ID_Comment, likeExist.dataValues.ID_User, !likeExist.dataValues.Like)
                return res.status(200).json(new SuccesResponseMsg('The like has been updated.', 200))
            }
            else{
                await commentService.createLike(data)
                return res.status(200).json(new SuccesResponseMsg('The like has been created.', 200))
            }

        } catch (error) {
            return res.status(500).json(new ErrorResponse(error.message, 500))
        }

    },

    // /**
    //  * update
    //  * @param { Request } req
    //  * @param { Response } res
    //  */
    // update: async ( req, res ) => {
    //     res.sendStatus(501)
    // },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {

        const id = req.params.ID_Comment
        const isDeleted = await commentService.delete(id)
        
        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = commentController