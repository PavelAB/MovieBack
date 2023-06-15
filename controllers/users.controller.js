const { Request, Response } = require('express')
const {SuccessResponse, SuccesResponseMsg} = require('../utils/SuccessResponse')
const userService = require('../services/users.service')
const { ErrorResponse } = require('../utils/ErrorResponse')

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
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async ( req, res ) => {
        const { values, count } = await userService.getByParams(req.params)
 
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
        const isCreated = await userService.create(data)

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
    
        const id = req.params.ID_User
        const body = req.body

        const updateUser = await userService.update( id, body )

        if(updateUser)
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
        const id = req.params.ID_User
        console.log("id :", id);
        const filename = req.file.filename

        const updated = await userService.updateAvatar(id, filename)
        if (!updated) {
            return res.status(400).json(new ErrorResponse( "Something wrong, update avatar failed.", 400 ))
        }
        res.status(204).json(new SuccesResponseMsg("Update avatar succeeded.", 204))
    },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async ( req, res ) => {
        const id = req.params.ID_User
        const isDeleted = await userService.delete(id)

        if(isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = userController